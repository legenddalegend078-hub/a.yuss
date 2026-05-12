import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(gl: GL, text: string, font = 'bold 30px sans-serif', color = 'white') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const fontSize = getFontSize(font);
  canvas.width = Math.ceil(metrics.width) + 20;
  canvas.height = Math.ceil(fontSize * 1.2) + 20;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  mesh!: Mesh;
  constructor({ gl, plane, renderer, text, textColor = '#ffffff', font = 'bold 30px sans-serif' }: any) {
    const { texture, width, height } = createTextTexture(gl, text, font, textColor);
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;void main(){vec4 c=texture2D(tMap,vUv);if(c.a<0.1)discard;gl_FragColor=c;}`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(gl, { geometry, program });
    const aspect = width / height;
    const th = plane.scale.y * 0.15;
    this.mesh.scale.set(th * aspect, th, 1);
    this.mesh.position.y = -plane.scale.y * 0.5 - th * 0.5 - 0.05;
    this.mesh.setParent(plane);
  }
}

class Media {
  extra = 0; speed = 0; isBefore = false; isAfter = false;
  plane!: Mesh; title!: Title; program!: Program;
  scale!: number; padding!: number; width!: number; widthTotal!: number; x!: number;

  constructor(private props: any) {
    autoBind(this);
    this.createShader();
    this.createMesh();
    this.title = new Title({ gl: props.gl, plane: this.plane, renderer: props.renderer, text: props.text, textColor: props.textColor, font: props.font });
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.props.gl, { generateMipmaps: true });
    this.program = new Program(this.props.gl, {
      depthTest: false, depthWrite: false,
      vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;p.z=(sin(p.x*4.0+uTime)*1.5+cos(p.y*2.0+uTime)*1.5)*(0.1+uSpeed*0.5);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);float alpha=1.0-smoothstep(-0.002,0.002,d);gl_FragColor=vec4(color.rgb,alpha);}`,
      uniforms: { tMap: { value: texture }, uPlaneSizes: { value: [0,0] }, uImageSizes: { value: [0,0] }, uSpeed: { value: 0 }, uTime: { value: 100*Math.random() }, uBorderRadius: { value: this.props.borderRadius || 0.05 } },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.props.image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };
  }

  createMesh() {
    this.plane = new Mesh(this.props.gl, { geometry: this.props.geometry, program: this.program });
    this.plane.setParent(this.props.scene);
  }

  update(scroll: any, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x, H = this.props.viewport.width / 2;
    if (this.props.bend === 0) { this.plane.position.y = 0; this.plane.rotation.z = 0; }
    else {
      const B = Math.abs(this.props.bend), R = (H*H + B*B) / (2*B);
      const ex = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R*R - ex*ex);
      if (this.props.bend > 0) { this.plane.position.y = -arc; this.plane.rotation.z = -Math.sign(x)*Math.asin(ex/R); }
      else { this.plane.position.y = arc; this.plane.rotation.z = Math.sign(x)*Math.asin(ex/R); }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const po = this.plane.scale.x / 2, vo = this.props.viewport.width / 2;
    this.isBefore = this.plane.position.x + po < -vo;
    this.isAfter = this.plane.position.x - po > vo;
    if (direction === 'right' && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === 'left' && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.props.screen = screen;
    if (viewport) this.props.viewport = viewport;
    this.scale = this.props.screen.height / 1500;
    this.plane.scale.y = (this.props.viewport.height * (900*this.scale)) / this.props.screen.height;
    this.plane.scale.x = (this.props.viewport.width * (700*this.scale)) / this.props.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.props.length;
    this.x = this.width * this.props.index;
  }
}

class AppCore {
  scroll: any; medias: Media[] = []; screen: any; viewport: any; raf = 0;
  renderer!: Renderer; gl!: GL; camera!: Camera; scene!: Transform; planeGeometry!: Plane;
  isDown = false; start = 0; onCheckDebounce: any;
  boundOnResize: any; boundOnWheel: any; boundOnTouchDown: any; boundOnTouchMove: any; boundOnTouchUp: any;

  constructor(private container: HTMLElement, private cfg: any) {
    this.scroll = { ease: cfg.scrollEase || 0.05, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio||1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0,0,0,0);
    container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.scene = new Transform();
    this.onResize();
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createMedias() {
    const defaultItems = [
      { image: 'https://picsum.photos/seed/10/800/600?grayscale', text: 'Linux' },
      { image: 'https://picsum.photos/seed/20/800/600?grayscale', text: 'Node.js' },
      { image: 'https://picsum.photos/seed/30/800/600?grayscale', text: 'Python' },
      { image: 'https://picsum.photos/seed/40/800/600?grayscale', text: 'React' },
      { image: 'https://picsum.photos/seed/50/800/600?grayscale', text: 'Java' },
      { image: 'https://picsum.photos/seed/60/800/600?grayscale', text: 'Web Dev' },
    ];
    const galleryItems = (this.cfg.items?.length ? this.cfg.items : defaultItems);
    const doubled = [...galleryItems, ...galleryItems];
    this.medias = doubled.map((data: any, index: number) => new Media({
      geometry: this.planeGeometry, gl: this.gl, image: data.image, index, length: doubled.length,
      renderer: this.renderer, scene: this.scene, screen: this.screen, text: data.text,
      viewport: this.viewport, bend: this.cfg.bend??3, textColor: this.cfg.textColor??'#ffffff',
      borderRadius: this.cfg.borderRadius??0.05, font: this.cfg.font,
    }));
  }

  onTouchDown(e: any) { this.isDown = true; this.scroll.position = this.scroll.current; this.start = e.touches?.[0]?.clientX ?? e.clientX; }
  onTouchMove(e: any) { if (!this.isDown) return; const x = e.touches?.[0]?.clientX ?? e.clientX; this.scroll.target = (this.scroll.position??0) + (this.start - x) * ((this.cfg.scrollSpeed??2) * 0.025); }
  onTouchUp() { this.isDown = false; this.onCheck(); }
  onWheel(e: any) { this.scroll.target += (e.deltaY > 0 ? 1 : -1) * (this.cfg.scrollSpeed??2) * 0.2; this.onCheckDebounce(); }
  onCheck() { if (!this.medias[0]) return; const w = this.medias[0].width; const i = Math.round(Math.abs(this.scroll.target)/w); this.scroll.target = Math.sign(this.scroll.target||1) * w * i; }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(fov/2) * this.camera.position.z;
    this.viewport = { width: h * this.camera.aspect, height: h };
    this.medias.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const dir = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias.forEach(m => m.update(this.scroll, dir));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('wheel', this.boundOnWheel, { passive: true });
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchUp);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    this.renderer.gl.canvas.parentNode?.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }
}

export interface CircularGalleryProps {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  className?: string;
}

export function CircularGallery({ items, bend=3, textColor='#ffffff', borderRadius=0.05, font='bold 28px sans-serif', scrollSpeed=2, scrollEase=0.05, className='' }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new AppCore(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });
    return () => app.destroy();
  }, []);
  return <div ref={containerRef} className={`w-full h-full overflow-hidden cursor-grab active:cursor-grabbing ${className}`} />;
}
