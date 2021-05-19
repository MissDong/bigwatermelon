window.__require=function t(e,i,c){function n(o,s){if(!i[o]){if(!e[o]){var a=o.split("/");if(a=a[a.length-1],!e[a]){var u="function"==typeof __require&&__require;if(!s&&u)return u(a,!0);if(r)return r(a,!0);throw new Error("Cannot find module '"+o+"'")}}var h=i[o]={exports:{}};e[o][0].call(h.exports,function(t){return n(e[o][1][t]||t)},h,h.exports,t,e,i,c)}return i[o].exports}for(var r="function"==typeof __require&&__require,o=0;o<c.length;o++)n(c[o]);return n}({Fruit:[function(t,e,i){"use strict";cc._RF.push(e,"365b4UAiQRBA7QXa2IuFMmj","Fruit"),cc.Class({extends:cc.Component,properties:{id:0},init:function(t){this.id=t.id,this.node.getComponent(cc.Sprite).spriteFrame=t.iconSF},start:function(){},onBeginContact:function(t,e,i){if(e.node&&i.node){var c=e.node.getComponent("Fruit"),n=i.node.getComponent("Fruit");c&&n&&c.id===n.id&&e.node.emit("sameContact",{self:e,other:i})}}}),cc._RF.pop()},{}],Game:[function(t,e,i){"use strict";cc._RF.push(e,"8e80dMWyH5LD7Oj100K42f8","Game");var c=cc.Class({name:"FruitItem",properties:{id:0,iconSF:cc.SpriteFrame}}),n=cc.Class({name:"JuiceItem",properties:{particle:cc.SpriteFrame,circle:cc.SpriteFrame,slash:cc.SpriteFrame}});cc.Class({extends:cc.Component,properties:{fruits:{default:[],type:c},juices:{default:[],type:n},fruitPrefab:{default:null,type:cc.Prefab},juicePrefab:{default:null,type:cc.Prefab},boomAudio:{default:null,type:cc.AudioClip},knockAudio:{default:null,type:cc.AudioClip},waterAudio:{default:null,type:cc.AudioClip},scoreLabel:{default:null,type:cc.Label},fingerBtn:{default:null,type:cc.Button}},onLoad:function(){cc.game.canvas.focus(),this.initPhysics(),this.isCreating=!1,this.fruitCount=0,this.score=0,this.useFinger=!1,this.director_=-1,this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.initOneFruit()},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},start:function(){this.fingerBtn.node.on(cc.Node.EventType.TOUCH_START,this.onFingerTouch,this)},update:function(){-1!=this.director_&&(this.checkDirection(),cc.log("the direction is %d",this.director_))},checkDirection:function(){if(!this.isCreating){var t=0,e=this.node.width;this.node.height;cc.log("size = "+e),t=1==this.director_?-e/(2*cc.director.getAnimationInterval()):e/(2*cc.director.getAnimationInterval());var i=this.currentFruit,c=i.getPosition().x+t,n=i.width;c<-e/2+n/2?c=-e/2+n/2:c>e/2-n/2&&(c=e/2-n/2),i.setPosition(c,i.getPosition().y)}},initPhysics:function(){var t=cc.director.getPhysicsManager();t.enabled=!0,t.gravity=cc.v2(0,-960),cc.director.getCollisionManager().enabled=!0;var e=this.node.width,i=this.node.height,c=new cc.Node;c.addComponent(cc.RigidBody).type=cc.RigidBodyType.Static;var n=function(t,e,i,c,n){var r=t.addComponent(cc.PhysicsBoxCollider);r.offset.x=e,r.offset.y=i,r.size.width=c,r.size.height=n};n(c,0,-i/2,e,1),n(c,0,i/2,e,1),n(c,-e/2,0,1,i),n(c,e/2,0,1,i),c.parent=this.node},initOneFruit:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.fruitCount++,this.currentFruit=this.createFruitOnPos(0,400,t)},startDropFruit:function(){var t=this;if(!this.isCreating){this.isCreating=!0;var e=this.currentFruit;this.startFruitPhysics(e),this.scheduleOnce(function(){var e=t.getNextFruitId();t.initOneFruit(e),t.isCreating=!1},1)}},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.left:this.director_=1;break;case cc.macro.KEY.right:this.director_=2;break;case cc.macro.KEY.enter:}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.left:1==this.director_&&(this.director_=-1);break;case cc.macro.KEY.right:2==this.director_&&(this.director_=-1);break;case cc.macro.KEY.enter:this.startDropFruit()}},onTouchStart:function(t){var e=this;if(!this.isCreating){this.isCreating=!0;var i=this.node,c=i.width,n=i.height,r=this.currentFruit,o=t.getLocation(),s=o.x;o.y;s-=c/2,n/2;var a=cc.sequence(cc.moveBy(.3,cc.v2(s,0)).easing(cc.easeCubicActionIn()),cc.callFunc(function(){e.startFruitPhysics(r),e.scheduleOnce(function(){var t=e.getNextFruitId();e.initOneFruit(t),e.isCreating=!1},1)}));r.runAction(a)}},onFingerTouch:function(){console.log("onFingerTouch"),this.useFinger=!0},getNextFruitId:function(){return this.fruitCount<3?1:3===this.fruitCount?2:Math.floor(5*Math.random())+1},createOneFruit:function(t){var e=this,i=cc.instantiate(this.fruitPrefab),c=this.fruits[t-1];return i.getComponent("Fruit").init({id:c.id,iconSF:c.iconSF}),i.getComponent(cc.RigidBody).type=cc.RigidBodyType.Static,i.getComponent(cc.PhysicsCircleCollider).radius=0,this.node.addChild(i),i.scale=.6,i.on("sameContact",this.onSameFruitContact.bind(this)),i.on(cc.Node.EventType.TOUCH_START,function(t){if(e.useFinger&&i!==e.currentFruit){var n=i.x,r=i.y,o=i.width;e.createFruitJuice(c.id,cc.v2({x:n,y:r}),o),t.stopPropagation(),e.useFinger=!1,i.removeFromParent(!0)}}),i},startFruitPhysics:function(t){t.getComponent(cc.RigidBody).type=cc.RigidBodyType.Dynamic;var e=t.getComponent(cc.PhysicsCircleCollider);e.radius=t.height/2,e.apply()},createFruitOnPos:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,c=this.createOneFruit(i);return c.setPosition(cc.v2(t,e)),c},onSameFruitContact:function(t){var e=t.self,i=t.other;i.node.off("sameContact");var c=i.getComponent("Fruit").id;e.node.removeFromParent(!0),i.node.removeFromParent(!0);var n=i.node,r=n.x,o=n.y;this.createFruitJuice(c,cc.v2({x:r,y:o}),i.node.width),this.addScore(c);var s=c+1;if(s<=11){var a=this.createFruitOnPos(r,o,s);this.startFruitPhysics(a),a.scale=0,cc.tween(a).to(.5,{scale:.6},{easing:"backOut"}).start()}else console.log(" todo \u5408\u6210\u4e24\u4e2a\u897f\u74dc \u8fd8\u6ca1\u6709\u5b9e\u73b0\u54e6~ ")},createFruitJuice:function(t,e,i){cc.audioEngine.play(this.boomAudio,!1,1),cc.audioEngine.play(this.waterAudio,!1,1);var c=cc.instantiate(this.juicePrefab);this.node.addChild(c);var n=this.juices[t-1],r=c.getComponent("Juice");r.init(n),r.showJuice(e,i)},addScore:function(t){this.score+=2*t,this.scoreLabel.string=this.score}}),cc._RF.pop()},{}],Juice:[function(t,e,i){"use strict";cc._RF.push(e,"56c1eHSOMxI0L+m6MX8FMXw","Juice");var c=function(t,e){return Math.floor(Math.random()*(e-t)+t)};cc.Class({extends:cc.Component,properties:{particle:{default:null,type:cc.SpriteFrame},circle:{default:null,type:cc.SpriteFrame},slash:{default:null,type:cc.SpriteFrame}},init:function(t){this.particle=t.particle,this.circle=t.particle,this.slash=t.slash},showJuice:function(t,e){for(var i=this,n=function(n){var r=new cc.Node("Sprite");r.addComponent(cc.Sprite).spriteFrame=i.particle,r.parent=i.node;var o=359*Math.random(),s=(n=30*Math.random()+e/2,cc.v2(Math.sin(o*Math.PI/180)*n,Math.cos(o*Math.PI/180)*n));r.scale=.5*Math.random()+e/100;var a=.5*Math.random();r.position=t,r.runAction(cc.sequence(cc.spawn(cc.moveBy(a,s),cc.scaleTo(a+.5,.3),cc.rotateBy(a+.5,c(-360,360))),cc.fadeOut(.1),cc.callFunc(function(){r.active=!1},i)))},r=0;r<10;++r)n(r);for(var o=function(c){var n=new cc.Node("Sprite");n.addComponent(cc.Sprite).spriteFrame=i.circle,n.parent=i.node;var r=359*Math.random(),o=30*Math.random()+e/2,s=cc.v2(Math.sin(r*Math.PI/180)*o,Math.cos(r*Math.PI/180)*o);n.scale=.5*Math.random()+e/100;var a=.5*Math.random();n.position=t,n.runAction(cc.sequence(cc.spawn(cc.moveBy(a,s),cc.scaleTo(a+.5,.3)),cc.fadeOut(.1),cc.callFunc(function(){n.active=!1},i)))},s=0;s<20;s++)o();var a=new cc.Node("Sprite");a.addComponent(cc.Sprite).spriteFrame=this.slash,a.parent=this.node,a.position=t,a.scale=0,a.angle=c(0,360),a.runAction(cc.sequence(cc.spawn(cc.scaleTo(.2,e/150),cc.fadeOut(1)),cc.callFunc(function(){a.active=!1})))}}),cc._RF.pop()},{}]},{},["Fruit","Game","Juice"]);