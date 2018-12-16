import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as PIXI from 'pixi.js';
import 'dragonBones';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent extends PIXI.Container implements AfterViewInit {
  @ViewChild('avatarEle') avatarEle: ElementRef;
  protected readonly _renderer = new PIXI.WebGLRenderer(80, 100);
  protected readonly _resources: string[] = [];
  protected _pixiResources: dragonBones.Map<PIXI.loaders.Resource>;
  protected _factory: dragonBones.PixiFactory = dragonBones.PixiFactory.factory;
  private _armatureDisplay: dragonBones.PixiArmatureDisplay;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.avatarEle.nativeElement.appendChild(this._renderer.view);

    this._resources.push(
      'assets/avatar/bones_allblue_ske.dbbin',
      'assets/avatar/bones_allblue_tex.json',
      'assets/avatar/bones_allblue_tex.png',
      'assets/avatar/bones_weapons_3_ske.json',
      'assets/avatar/bones_weapons_3_tex.json',
      'assets/avatar/bones_weapons_3_tex.png',
    );
    setTimeout(() => {
      // this.x = 400 * 0.5;
      // this.y = 30;
      this._loadResources();
    }, 10);
  }

  protected _onStart(): void {
    this._factory.parseDragonBonesData(this._pixiResources['assets/avatar/bones_allblue_ske.dbbin'].data);
    this._factory.parseTextureAtlasData(this._pixiResources['assets/avatar/bones_allblue_tex.json'].data,
      this._pixiResources['assets/avatar/bones_allblue_tex.png'].texture);

    this._armatureDisplay = this._factory.buildArmatureDisplay('Armature', 'bones_allblue');
    this._armatureDisplay.armature.cacheFrameRate = 0;
    this._armatureDisplay.x = 40.0;
    this._armatureDisplay.y = 80.0;
    this._armatureDisplay.animation.play('walk_3');
    this.addChild(this._armatureDisplay);
  }

  protected _renderHandler(deltaTime: number): void {
    this._renderer.render(this);
  }

  protected _startRenderTick(): void {
    PIXI.ticker.shared.add(this._renderHandler, this);
  }

  protected _loadResources(): void {
    const binaryOptions = {loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER};

    for (const resource of this._resources) {
      if (resource.indexOf('dbbin') > 0) {
        PIXI.loader.add(resource, resource, binaryOptions as any);
      } else {
        PIXI.loader.add(resource, resource);
      }
    }

    PIXI.loader.once('complete', (loader: PIXI.loaders.Loader, resources: dragonBones.Map<PIXI.loaders.Resource>) => {
      this._pixiResources = resources;
      this._onStart();
      this._startRenderTick(); // Make sure render after dragonBones update.
    });
    PIXI.loader.load();
  }
}
