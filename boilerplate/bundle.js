/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require, exports, module) {
	    // load non-js resources (css, index.html)
	    __webpack_require__(2);

	    // import dependencies
	    var Engine = __webpack_require__(4);
	    var Modifier = __webpack_require__(5);
	    var Transform = __webpack_require__(6);
	    var ImageSurface = __webpack_require__(7);

	    // create the main context
	    var mainContext = Engine.createContext();

	    // your app here
	    var logo = new ImageSurface({
	        size: [200, 200],
	        content: 'http://code.famo.us/assets/famous_logo.svg',
	        classes: ['double-sided']
	    });

	    var initialTime = Date.now();
	    var centerSpinModifier = new Modifier({
	        origin: [0.5, 0.5],
	        transform : function(){
	            return Transform.rotateY(0.002 * (Date.now() - initialTime));
	        }
	    });

	    mainContext.add(centerSpinModifier).add(logo);

	    /**
	     * Support for multiple configurations using the global ENV variable.
	     *
	     * Set the variable in webpack.config.js, or with the --env=XXXX flag.
	     */
	    if(false) {
	        console.log("Hooray! This is the production environment. You can use different settings!");
	    } else {
	        console.log("You're running in the "+("dev")+" environment. Try \"webpack --env=production\".");
	    }

	    /**
	     * Support for Cordova
	     */
	    document.addEventListener("deviceready", function(){
	        // Add the cordova.js script tag to your HTML to load cordova.
	        //
	        //  <script type="text/javascript" src="cordova.js"></script>
	        console.log('Cordova loaded succesfully - Device Ready!');
	    }, false);
	}.call(exports, __webpack_require__, exports, module)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	__webpack_require__(11);
	__webpack_require__(8);

	// Copy the index.html to the output folder
	__webpack_require__(10);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {var io = __webpack_require__(9);
	var scriptElements = document.getElementsByTagName("script");
	io = io.connect(true ?
		__resourceQuery.substr(1) :
		scriptElements[scriptElements.length-1].getAttribute("src").replace(/\/[^\/]+$/, "")
	);

	var hot = false;
	var initial = true;

	io.on("hot", function() {
		hot = true;
		console.log("webpack-dev-server: Hot Module Replacement enabled.");
	});

	io.on("invalid", function() {
		console.log("webpack-dev-server: App updated. Recompiling...");
	});

	io.on("ok", function() {
		if(initial) return initial = false;
		reloadApp();
	});

	io.on("warnings", function(warnings) {
		console.log("webpack-dev-server: Warnings while compiling.");
		for(var i = 0; i < warnings.length; i++)
			console.warn(warnings[i]);
		if(initial) return initial = false;
		reloadApp();
	});

	io.on("errors", function(errors) {
		console.log("webpack-dev-server: Errors while compiling.");
		for(var i = 0; i < errors.length; i++)
			console.error(errors[i]);
		if(initial) return initial = false;
		reloadApp();
	});

	io.on("disconnect", function() {
		console.error("webpack-dev-server: Disconnected!");
	});

	function reloadApp() {
		if(hot) {
			console.log("webpack-dev-server: App hot update...");
			window.postMessage("webpackHotUpdate", "*");
		} else {
			console.log("webpack-dev-server: App updated. Reloading...");
			window.location.reload();
		}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "?http://192.168.0.1:8080/"))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	/**
	 * The singleton object initiated upon process
	 *   startup which manages all active Context instances, runs
	 *   the render dispatch loop, and acts as a listener and dispatcher
	 *   for events.  All methods are therefore static.
	 *
	 *   On static initialization, window.requestAnimationFrame is called with
	 *     the event loop function.
	 *
	 *   Note: Any window in which Engine runs will prevent default
	 *     scrolling behavior on the 'touchmove' event.
	 *
	 * @static
	 * @class Engine
	 */
	var Context = __webpack_require__(15);
	var EventHandler = __webpack_require__(16);
	var OptionsManager = __webpack_require__(17);

	var Engine = {};

	var contexts = [];
	var nextTickQueue = [];
	var deferQueue = [];

	var lastTime = Date.now();
	var frameTime;
	var frameTimeLimit;
	var loopEnabled = true;
	var eventForwarders = {};
	var eventHandler = new EventHandler();

	var options = {
	    containerType: 'div',
	    containerClass: 'famous-container',
	    fpsCap: undefined,
	    runLoop: true
	};
	var optionsManager = new OptionsManager(options);

	/** @const */
	var MAX_DEFER_FRAME_TIME = 10;

	/**
	 * Inside requestAnimationFrame loop, step() is called, which:
	 *   calculates current FPS (throttling loop if it is over limit set in setFPSCap),
	 *   emits dataless 'prerender' event on start of loop,
	 *   calls in order any one-shot functions registered by nextTick on last loop,
	 *   calls Context.update on all Context objects registered,
	 *   and emits dataless 'postrender' event on end of loop.
	 *
	 * @static
	 * @private
	 * @method step
	 */
	Engine.step = function step() {
	    var currentTime = Date.now();

	    // skip frame if we're over our framerate cap
	    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit) return;

	    var i = 0;

	    frameTime = currentTime - lastTime;
	    lastTime = currentTime;

	    eventHandler.emit('prerender');

	    // empty the queue
	    for (i = 0; i < nextTickQueue.length; i++) nextTickQueue[i].call(this);
	    nextTickQueue.splice(0);

	    // limit total execution time for deferrable functions
	    while (deferQueue.length && (Date.now() - currentTime) < MAX_DEFER_FRAME_TIME) {
	        deferQueue.shift().call(this);
	    }

	    for (i = 0; i < contexts.length; i++) contexts[i].update();

	    eventHandler.emit('postrender');
	};

	// engage requestAnimationFrame
	function loop() {
	    if (options.runLoop) {
	        Engine.step();
	        window.requestAnimationFrame(loop);
	    }
	    else loopEnabled = false;
	}
	window.requestAnimationFrame(loop);

	//
	// Upon main document window resize (unless on an "input" HTML element):
	//   scroll to the top left corner of the window,
	//   and for each managed Context: emit the 'resize' event and update its size.
	// @param {Object=} event document event
	//
	function handleResize(event) {
	    for (var i = 0; i < contexts.length; i++) {
	        contexts[i].emit('resize');
	    }
	    eventHandler.emit('resize');
	}
	window.addEventListener('resize', handleResize, false);
	handleResize();

	// prevent scrolling via browser
	window.addEventListener('touchmove', function(event) {
	    event.preventDefault();
	}, true);

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	Engine.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function) return target.subscribe(Engine);
	    else return eventHandler.pipe(target);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe".
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	Engine.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function) return target.unsubscribe(Engine);
	    else return eventHandler.unpipe(target);
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @static
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	Engine.on = function on(type, handler) {
	    if (!(type in eventForwarders)) {
	        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
	        if (document.body) {
	            document.body.addEventListener(type, eventForwarders[type]);
	        }
	        else {
	            Engine.nextTick(function(type, forwarder) {
	                document.body.addEventListener(type, forwarder);
	            }.bind(this, type, eventForwarders[type]));
	        }
	    }
	    return eventHandler.on(type, handler);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	Engine.emit = function emit(type, event) {
	    return eventHandler.emit(type, event);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @static
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function} handler function object to remove
	 * @return {EventHandler} internal event handler object (for chaining)
	 */
	Engine.removeListener = function removeListener(type, handler) {
	    return eventHandler.removeListener(type, handler);
	};

	/**
	 * Return the current calculated frames per second of the Engine.
	 *
	 * @static
	 * @method getFPS
	 *
	 * @return {Number} calculated fps
	 */
	Engine.getFPS = function getFPS() {
	    return 1000 / frameTime;
	};

	/**
	 * Set the maximum fps at which the system should run. If internal render
	 *    loop is called at a greater frequency than this FPSCap, Engine will
	 *    throttle render and update until this rate is achieved.
	 *
	 * @static
	 * @method setFPSCap
	 *
	 * @param {Number} fps maximum frames per second
	 */
	Engine.setFPSCap = function setFPSCap(fps) {
	    frameTimeLimit = Math.floor(1000 / fps);
	};

	/**
	 * Return engine options.
	 *
	 * @static
	 * @method getOptions
	 * @param {string} key
	 * @return {Object} engine options
	 */
	Engine.getOptions = function getOptions() {
	    return optionsManager.getOptions.apply(optionsManager, arguments);
	};

	/**
	 * Set engine options
	 *
	 * @static
	 * @method setOptions
	 *
	 * @param {Object} [options] overrides of default options
	 * @param {Number} [options.fpsCap]  maximum fps at which the system should run
	 * @param {boolean} [options.runLoop=true] whether the run loop should continue
	 * @param {string} [options.containerType="div"] type of container element.  Defaults to 'div'.
	 * @param {string} [options.containerClass="famous-container"] type of container element.  Defaults to 'famous-container'.
	 */
	Engine.setOptions = function setOptions(options) {
	    return optionsManager.setOptions.apply(optionsManager, arguments);
	};

	/**
	 * Creates a new Context for rendering and event handling with
	 *    provided document element as top of each tree. This will be tracked by the
	 *    process-wide Engine.
	 *
	 * @static
	 * @method createContext
	 *
	 * @param {Node} el will be top of Famo.us document element tree
	 * @return {Context} new Context within el
	 */
	Engine.createContext = function createContext(el) {
	    var needMountContainer = false;
	    if (!el) {
	        el = document.createElement(options.containerType);
	        el.classList.add(options.containerClass);
	        needMountContainer = true;
	    }
	    var context = new Context(el);
	    Engine.registerContext(context);
	    if (needMountContainer) {
	        Engine.nextTick(function(context, el) {
	            document.body.appendChild(el);
	            context.emit('resize');
	        }.bind(this, context, el));
	    }
	    return context;
	};

	/**
	 * Registers an existing context to be updated within the run loop.
	 *
	 * @static
	 * @method registerContext
	 *
	 * @param {Context} context Context to register
	 * @return {FamousContext} provided context
	 */
	Engine.registerContext = function registerContext(context) {
	    contexts.push(context);
	    return context;
	};

	/**
	 * Queue a function to be executed on the next tick of the
	 *    Engine.
	 *
	 * @static
	 * @method nextTick
	 *
	 * @param {function(Object)} fn function accepting window object
	 */
	Engine.nextTick = function nextTick(fn) {
	    nextTickQueue.push(fn);
	};

	/**
	 * Queue a function to be executed sometime soon, at a time that is
	 *    unlikely to affect frame rate.
	 *
	 * @static
	 * @method defer
	 *
	 * @param {Function} fn
	 */
	Engine.defer = function defer(fn) {
	    deferQueue.push(fn);
	};

	optionsManager.on('change', function(data) {
	    if (data.id === 'fpsCap') Engine.setFPSCap(data.value);
	    else if (data.id === 'runLoop') {
	        // kick off the loop only if it was stopped
	        if (!loopEnabled && data.value) {
	            loopEnabled = true;
	            window.requestAnimationFrame(loop);
	        }
	    }
	});

	module.exports = Engine;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Transform = __webpack_require__(6);
	var Transitionable = __webpack_require__(20);
	var TransitionableTransform = __webpack_require__(21);

	/**
	 *
	 *  A collection of visual changes to be
	 *    applied to another renderable component. This collection includes a
	 *    transform matrix, an opacity constant, a size, an origin specifier.
	 *    Modifier objects can be added to any RenderNode or object
	 *    capable of displaying renderables.  The Modifier's children and descendants
	 *    are transformed by the amounts specified in the Modifier's properties.
	 *
	 * @class Modifier
	 * @constructor
	 * @param {Object} [options] overrides of default options
	 * @param {Transform} [options.transform] affine transformation matrix
	 * @param {Number} [options.opacity]
	 * @param {Array.Number} [options.origin] origin adjustment
	 * @param {Array.Number} [options.size] size to apply to descendants
	 */
	function Modifier(options) {
	    this._transformGetter = null;
	    this._opacityGetter = null;
	    this._originGetter = null;
	    this._alignGetter = null;
	    this._sizeGetter = null;

	    /* TODO: remove this when deprecation complete */
	    this._legacyStates = {};

	    this._output = {
	        transform: Transform.identity,
	        opacity: 1,
	        origin: null,
	        align: null,
	        size: null,
	        target: null
	    };

	    if (options) {
	        if (options.transform) this.transformFrom(options.transform);
	        if (options.opacity !== undefined) this.opacityFrom(options.opacity);
	        if (options.origin) this.originFrom(options.origin);
	        if (options.align) this.alignFrom(options.align);
	        if (options.size) this.sizeFrom(options.size);
	    }
	}

	/**
	 * Function, object, or static transform matrix which provides the transform.
	 *   This is evaluated on every tick of the engine.
	 *
	 * @method transformFrom
	 *
	 * @param {Object} transform transform provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.transformFrom = function transformFrom(transform) {
	    if (transform instanceof Function) this._transformGetter = transform;
	    else if (transform instanceof Object && transform.get) this._transformGetter = transform.get.bind(transform);
	    else {
	        this._transformGetter = null;
	        this._output.transform = transform;
	    }
	    return this;
	};

	/**
	 * Set function, object, or number to provide opacity, in range [0,1].
	 *
	 * @method opacityFrom
	 *
	 * @param {Object} opacity provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
	    if (opacity instanceof Function) this._opacityGetter = opacity;
	    else if (opacity instanceof Object && opacity.get) this._opacityGetter = opacity.get.bind(opacity);
	    else {
	        this._opacityGetter = null;
	        this._output.opacity = opacity;
	    }
	    return this;
	};

	/**
	 * Set function, object, or numerical array to provide origin, as [x,y],
	 *   where x and y are in the range [0,1].
	 *
	 * @method originFrom
	 *
	 * @param {Object} origin provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.originFrom = function originFrom(origin) {
	    if (origin instanceof Function) this._originGetter = origin;
	    else if (origin instanceof Object && origin.get) this._originGetter = origin.get.bind(origin);
	    else {
	        this._originGetter = null;
	        this._output.origin = origin;
	    }
	    return this;
	};

	/**
	 * Set function, object, or numerical array to provide align, as [x,y],
	 *   where x and y are in the range [0,1].
	 *
	 * @method alignFrom
	 *
	 * @param {Object} align provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.alignFrom = function alignFrom(align) {
	    if (align instanceof Function) this._alignGetter = align;
	    else if (align instanceof Object && align.get) this._alignGetter = align.get.bind(align);
	    else {
	        this._alignGetter = null;
	        this._output.align = align;
	    }
	    return this;
	};

	/**
	 * Set function, object, or numerical array to provide size, as [width, height].
	 *
	 * @method sizeFrom
	 *
	 * @param {Object} size provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.sizeFrom = function sizeFrom(size) {
	    if (size instanceof Function) this._sizeGetter = size;
	    else if (size instanceof Object && size.get) this._sizeGetter = size.get.bind(size);
	    else {
	        this._sizeGetter = null;
	        this._output.size = size;
	    }
	    return this;
	};

	 /**
	 * Deprecated: Prefer transformFrom with static Transform, or use a TransitionableTransform.
	 * @deprecated
	 * @method setTransform
	 *
	 * @param {Transform} transform Transform to transition to
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
	    if (transition || this._legacyStates.transform) {
	        if (!this._legacyStates.transform) {
	            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
	        }
	        if (!this._transformGetter) this.transformFrom(this._legacyStates.transform);

	        this._legacyStates.transform.set(transform, transition, callback);
	        return this;
	    }
	    else return this.transformFrom(transform);
	};

	/**
	 * Deprecated: Prefer opacityFrom with static opacity array, or use a Transitionable with that opacity.
	 * @deprecated
	 * @method setOpacity
	 *
	 * @param {Number} opacity Opacity value to transition to.
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
	    if (transition || this._legacyStates.opacity) {
	        if (!this._legacyStates.opacity) {
	            this._legacyStates.opacity = new Transitionable(this._output.opacity);
	        }
	        if (!this._opacityGetter) this.opacityFrom(this._legacyStates.opacity);

	        return this._legacyStates.opacity.set(opacity, transition, callback);
	    }
	    else return this.opacityFrom(opacity);
	};

	/**
	 * Deprecated: Prefer originFrom with static origin array, or use a Transitionable with that origin.
	 * @deprecated
	 * @method setOrigin
	 *
	 * @param {Array.Number} origin two element array with values between 0 and 1.
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
	    /* TODO: remove this if statement when deprecation complete */
	    if (transition || this._legacyStates.origin) {

	        if (!this._legacyStates.origin) {
	            this._legacyStates.origin = new Transitionable(this._output.origin || [0, 0]);
	        }
	        if (!this._originGetter) this.originFrom(this._legacyStates.origin);

	        this._legacyStates.origin.set(origin, transition, callback);
	        return this;
	    }
	    else return this.originFrom(origin);
	};

	/**
	 * Deprecated: Prefer alignFrom with static align array, or use a Transitionable with that align.
	 * @deprecated
	 * @method setAlign
	 *
	 * @param {Array.Number} align two element array with values between 0 and 1.
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
	    /* TODO: remove this if statement when deprecation complete */
	    if (transition || this._legacyStates.align) {

	        if (!this._legacyStates.align) {
	            this._legacyStates.align = new Transitionable(this._output.align || [0, 0]);
	        }
	        if (!this._alignGetter) this.alignFrom(this._legacyStates.align);

	        this._legacyStates.align.set(align, transition, callback);
	        return this;
	    }
	    else return this.alignFrom(align);
	};

	/**
	 * Deprecated: Prefer sizeFrom with static origin array, or use a Transitionable with that size.
	 * @deprecated
	 * @method setSize
	 * @param {Array.Number} size two element array of [width, height]
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setSize = function setSize(size, transition, callback) {
	    if (size && (transition || this._legacyStates.size)) {
	        if (!this._legacyStates.size) {
	            this._legacyStates.size = new Transitionable(this._output.size || [0, 0]);
	        }
	        if (!this._sizeGetter) this.sizeFrom(this._legacyStates.size);

	        this._legacyStates.size.set(size, transition, callback);
	        return this;
	    }
	    else return this.sizeFrom(size);
	};

	/**
	 * Deprecated: Prefer to stop transform in your provider object.
	 * @deprecated
	 * @method halt
	 */
	Modifier.prototype.halt = function halt() {
	    if (this._legacyStates.transform) this._legacyStates.transform.halt();
	    if (this._legacyStates.opacity) this._legacyStates.opacity.halt();
	    if (this._legacyStates.origin) this._legacyStates.origin.halt();
	    if (this._legacyStates.align) this._legacyStates.align.halt();
	    if (this._legacyStates.size) this._legacyStates.size.halt();
	    this._transformGetter = null;
	    this._opacityGetter = null;
	    this._originGetter = null;
	    this._alignGetter = null;
	    this._sizeGetter = null;
	};

	/**
	 * Deprecated: Prefer to use your provided transform or output of your transform provider.
	 * @deprecated
	 * @method getTransform
	 * @return {Object} transform provider object
	 */
	Modifier.prototype.getTransform = function getTransform() {
	    return this._transformGetter();
	};

	/**
	 * Deprecated: Prefer to determine the end state of your transform from your transform provider
	 * @deprecated
	 * @method getFinalTransform
	 * @return {Transform} transform matrix
	 */
	Modifier.prototype.getFinalTransform = function getFinalTransform() {
	    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
	};

	/**
	 * Deprecated: Prefer to use your provided opacity or output of your opacity provider.
	 * @deprecated
	 * @method getOpacity
	 * @return {Object} opacity provider object
	 */
	Modifier.prototype.getOpacity = function getOpacity() {
	    return this._opacityGetter();
	};

	/**
	 * Deprecated: Prefer to use your provided origin or output of your origin provider.
	 * @deprecated
	 * @method getOrigin
	 * @return {Object} origin provider object
	 */
	Modifier.prototype.getOrigin = function getOrigin() {
	    return this._originGetter();
	};

	/**
	 * Deprecated: Prefer to use your provided align or output of your align provider.
	 * @deprecated
	 * @method getAlign
	 * @return {Object} align provider object
	 */
	Modifier.prototype.getAlign = function getAlign() {
	    return this._alignGetter();
	};

	/**
	 * Deprecated: Prefer to use your provided size or output of your size provider.
	 * @deprecated
	 * @method getSize
	 * @return {Object} size provider object
	 */
	Modifier.prototype.getSize = function getSize() {
	    return this._sizeGetter ? this._sizeGetter() : this._output.size;
	};

	// call providers on tick to receive render spec elements to apply
	function _update() {
	    if (this._transformGetter) this._output.transform = this._transformGetter();
	    if (this._opacityGetter) this._output.opacity = this._opacityGetter();
	    if (this._originGetter) this._output.origin = this._originGetter();
	    if (this._alignGetter) this._output.align = this._alignGetter();
	    if (this._sizeGetter) this._output.size = this._sizeGetter();
	}

	/**
	 * Return render spec for this Modifier, applying to the provided
	 *    target component.  This is similar to render() for Surfaces.
	 *
	 * @private
	 * @method modify
	 *
	 * @param {Object} target (already rendered) render spec to
	 *    which to apply the transform.
	 * @return {Object} render spec for this Modifier, including the
	 *    provided target
	 */
	Modifier.prototype.modify = function modify(target) {
	    _update.call(this);
	    this._output.target = target;
	    return this._output;
	};

	module.exports = Modifier;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 *  A high-performance static matrix math library used to calculate
	 *    affine transforms on surfaces and other renderables.
	 *    Famo.us uses 4x4 matrices corresponding directly to
	 *    WebKit matrices (column-major order).
	 *
	 *    The internal "type" of a Matrix is a 16-long float array in
	 *    row-major order, with:
	 *    elements [0],[1],[2],[4],[5],[6],[8],[9],[10] forming the 3x3
	 *          transformation matrix;
	 *    elements [12], [13], [14] corresponding to the t_x, t_y, t_z
	 *           translation;
	 *    elements [3], [7], [11] set to 0;
	 *    element [15] set to 1.
	 *    All methods are static.
	 *
	 * @static
	 *
	 * @class Transform
	 */
	var Transform = {};

	// WARNING: these matrices correspond to WebKit matrices, which are
	//    transposed from their math counterparts
	Transform.precision = 1e-6;
	Transform.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	/**
	 * Multiply two or more Transform matrix types to return a Transform matrix.
	 *
	 * @method multiply4x4
	 * @static
	 * @param {Transform} a left Transform
	 * @param {Transform} b right Transform
	 * @return {Transform}
	 */
	Transform.multiply4x4 = function multiply4x4(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
	        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
	        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
	        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
	        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
	    ];
	};

	/**
	 * Fast-multiply two or more Transform matrix types to return a
	 *    Matrix, assuming bottom row on each is [0 0 0 1].
	 *
	 * @method multiply
	 * @static
	 * @param {Transform} a left Transform
	 * @param {Transform} b right Transform
	 * @return {Transform}
	 */
	Transform.multiply = function multiply(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
	        0,
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
	        0,
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
	        0,
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
	        1
	    ];
	};

	/**
	 * Return a Transform translated by additional amounts in each
	 *    dimension. This is equivalent to the result of
	 *
	 *    Transform.multiply(Matrix.translate(t[0], t[1], t[2]), m).
	 *
	 * @method thenMove
	 * @static
	 * @param {Transform} m a Transform
	 * @param {Array.Number} t floats delta vector of length 2 or 3
	 * @return {Transform}
	 */
	Transform.thenMove = function thenMove(m, t) {
	    if (!t[2]) t[2] = 0;
	    return [m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, m[12] + t[0], m[13] + t[1], m[14] + t[2], 1];
	};

	/**
	 * Return a Transform atrix which represents the result of a transform matrix
	 *    applied after a move. This is faster than the equivalent multiply.
	 *    This is equivalent to the result of:
	 *
	 *    Transform.multiply(m, Transform.translate(t[0], t[1], t[2])).
	 *
	 * @method moveThen
	 * @static
	 * @param {Array.Number} v vector representing initial movement
	 * @param {Transform} m matrix to apply afterwards
	 * @return {Transform} the resulting matrix
	 */
	Transform.moveThen = function moveThen(v, m) {
	    if (!v[2]) v[2] = 0;
	    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
	    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
	    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
	    return Transform.thenMove(m, [t0, t1, t2]);
	};

	/**
	 * Return a Transform which represents a translation by specified
	 *    amounts in each dimension.
	 *
	 * @method translate
	 * @static
	 * @param {Number} x x translation
	 * @param {Number} y y translation
	 * @param {Number} z z translation
	 * @return {Transform}
	 */
	Transform.translate = function translate(x, y, z) {
	    if (z === undefined) z = 0;
	    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
	};

	/**
	 * Return a Transform scaled by a vector in each
	 *    dimension. This is a more performant equivalent to the result of
	 *
	 *    Transform.multiply(Transform.scale(s[0], s[1], s[2]), m).
	 *
	 * @method thenScale
	 * @static
	 * @param {Transform} m a matrix
	 * @param {Array.Number} s delta vector (array of floats &&
	 *    array.length == 3)
	 * @return {Transform}
	 */
	Transform.thenScale = function thenScale(m, s) {
	    return [
	        s[0] * m[0], s[1] * m[1], s[2] * m[2], 0,
	        s[0] * m[4], s[1] * m[5], s[2] * m[6], 0,
	        s[0] * m[8], s[1] * m[9], s[2] * m[10], 0,
	        s[0] * m[12], s[1] * m[13], s[2] * m[14], 1
	    ];
	};

	/**
	 * Return a Transform which represents a scale by specified amounts
	 *    in each dimension.
	 *
	 * @method scale
	 * @static
	 * @param {Number} x x scale factor
	 * @param {Number} y y scale factor
	 * @param {Number} z z scale factor
	 * @return {Transform}
	 */
	Transform.scale = function scale(x, y, z) {
	    if (z === undefined) z = 1;
	    return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents a clockwise
	 *    rotation around the x axis.
	 *
	 * @method rotateX
	 * @static
	 * @param {Number} theta radians
	 * @return {Transform}
	 */
	Transform.rotateX = function rotateX(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [1, 0, 0, 0, 0, cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents a clockwise
	 *    rotation around the y axis.
	 *
	 * @method rotateY
	 * @static
	 * @param {Number} theta radians
	 * @return {Transform}
	 */
	Transform.rotateY = function rotateY(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [cosTheta, 0, -sinTheta, 0, 0, 1, 0, 0, sinTheta, 0, cosTheta, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents a clockwise
	 *    rotation around the z axis.
	 *
	 * @method rotateZ
	 * @static
	 * @param {Number} theta radians
	 * @return {Transform}
	 */
	Transform.rotateZ = function rotateZ(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents composed clockwise
	 *    rotations along each of the axes. Equivalent to the result of
	 *    Matrix.multiply(rotateX(phi), rotateY(theta), rotateZ(psi)).
	 *
	 * @method rotate
	 * @static
	 * @param {Number} phi radians to rotate about the positive x axis
	 * @param {Number} theta radians to rotate about the positive y axis
	 * @param {Number} psi radians to rotate about the positive z axis
	 * @return {Transform}
	 */
	Transform.rotate = function rotate(phi, theta, psi) {
	    var cosPhi = Math.cos(phi);
	    var sinPhi = Math.sin(phi);
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    var cosPsi = Math.cos(psi);
	    var sinPsi = Math.sin(psi);
	    var result = [
	        cosTheta * cosPsi,
	        cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
	        sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
	        0,
	        -cosTheta * sinPsi,
	        cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
	        sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
	        0,
	        sinTheta,
	        -sinPhi * cosTheta,
	        cosPhi * cosTheta,
	        0,
	        0, 0, 0, 1
	    ];
	    return result;
	};

	/**
	 * Return a Transform which represents an axis-angle rotation
	 *
	 * @method rotateAxis
	 * @static
	 * @param {Array.Number} v unit vector representing the axis to rotate about
	 * @param {Number} theta radians to rotate clockwise about the axis
	 * @return {Transform}
	 */
	Transform.rotateAxis = function rotateAxis(v, theta) {
	    var sinTheta = Math.sin(theta);
	    var cosTheta = Math.cos(theta);
	    var verTheta = 1 - cosTheta; // versine of theta

	    var xxV = v[0] * v[0] * verTheta;
	    var xyV = v[0] * v[1] * verTheta;
	    var xzV = v[0] * v[2] * verTheta;
	    var yyV = v[1] * v[1] * verTheta;
	    var yzV = v[1] * v[2] * verTheta;
	    var zzV = v[2] * v[2] * verTheta;
	    var xs = v[0] * sinTheta;
	    var ys = v[1] * sinTheta;
	    var zs = v[2] * sinTheta;

	    var result = [
	        xxV + cosTheta, xyV + zs, xzV - ys, 0,
	        xyV - zs, yyV + cosTheta, yzV + xs, 0,
	        xzV + ys, yzV - xs, zzV + cosTheta, 0,
	        0, 0, 0, 1
	    ];
	    return result;
	};

	/**
	 * Return a Transform which represents a transform matrix applied about
	 * a separate origin point.
	 *
	 * @method aboutOrigin
	 * @static
	 * @param {Array.Number} v origin point to apply matrix
	 * @param {Transform} m matrix to apply
	 * @return {Transform}
	 */
	Transform.aboutOrigin = function aboutOrigin(v, m) {
	    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
	    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
	    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
	    return Transform.thenMove(m, [t0, t1, t2]);
	};

	/**
	 * Return a Transform representation of a skew transformation
	 *
	 * @method skew
	 * @static
	 * @param {Number} phi scale factor skew in the x axis
	 * @param {Number} theta scale factor skew in the y axis
	 * @param {Number} psi scale factor skew in the z axis
	 * @return {Transform}
	 */
	Transform.skew = function skew(phi, theta, psi) {
	    return [1, 0, 0, 0, Math.tan(psi), 1, 0, 0, Math.tan(theta), Math.tan(phi), 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform representation of a skew in the x-direction
	 *
	 * @method skewX
	 * @static
	 * @param {Number} angle the angle between the top and left sides
	 * @return {Transform}
	 */
	Transform.skewX = function skewX(angle) {
	    return [1, 0, 0, 0, Math.tan(angle), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform representation of a skew in the y-direction
	 *
	 * @method skewY
	 * @static
	 * @param {Number} angle the angle between the top and right sides
	 * @return {Transform}
	 */
	Transform.skewY = function skewY(angle) {
	    return [1, Math.tan(angle), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Returns a perspective Transform matrix
	 *
	 * @method perspective
	 * @static
	 * @param {Number} focusZ z position of focal point
	 * @return {Transform}
	 */
	Transform.perspective = function perspective(focusZ) {
	    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1 / focusZ, 0, 0, 0, 1];
	};

	/**
	 * Return translation vector component of given Transform
	 *
	 * @method getTranslate
	 * @static
	 * @param {Transform} m Transform
	 * @return {Array.Number} the translation vector [t_x, t_y, t_z]
	 */
	Transform.getTranslate = function getTranslate(m) {
	    return [m[12], m[13], m[14]];
	};

	/**
	 * Return inverse affine transform for given Transform.
	 *   Note: This assumes m[3] = m[7] = m[11] = 0, and m[15] = 1.
	 *   Will provide incorrect results if not invertible or preconditions not met.
	 *
	 * @method inverse
	 * @static
	 * @param {Transform} m Transform
	 * @return {Transform}
	 */
	Transform.inverse = function inverse(m) {
	    // only need to consider 3x3 section for affine
	    var c0 = m[5] * m[10] - m[6] * m[9];
	    var c1 = m[4] * m[10] - m[6] * m[8];
	    var c2 = m[4] * m[9] - m[5] * m[8];
	    var c4 = m[1] * m[10] - m[2] * m[9];
	    var c5 = m[0] * m[10] - m[2] * m[8];
	    var c6 = m[0] * m[9] - m[1] * m[8];
	    var c8 = m[1] * m[6] - m[2] * m[5];
	    var c9 = m[0] * m[6] - m[2] * m[4];
	    var c10 = m[0] * m[5] - m[1] * m[4];
	    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
	    var invD = 1 / detM;
	    var result = [
	        invD * c0, -invD * c4, invD * c8, 0,
	        -invD * c1, invD * c5, -invD * c9, 0,
	        invD * c2, -invD * c6, invD * c10, 0,
	        0, 0, 0, 1
	    ];
	    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
	    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
	    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
	    return result;
	};

	/**
	 * Returns the transpose of a 4x4 matrix
	 *
	 * @method transpose
	 * @static
	 * @param {Transform} m matrix
	 * @return {Transform} the resulting transposed matrix
	 */
	Transform.transpose = function transpose(m) {
	    return [m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]];
	};

	function _normSquared(v) {
	    return (v.length === 2) ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	}
	function _norm(v) {
	    return Math.sqrt(_normSquared(v));
	}
	function _sign(n) {
	    return (n < 0) ? -1 : 1;
	}

	/**
	 * Decompose Transform into separate .translate, .rotate, .scale,
	 *    and .skew components.
	 *
	 * @method interpret
	 * @static
	 * @param {Transform} M transform matrix
	 * @return {Object} matrix spec object with component matrices .translate,
	 *    .rotate, .scale, .skew
	 */
	Transform.interpret = function interpret(M) {

	    // QR decomposition via Householder reflections
	    //FIRST ITERATION

	    //default Q1 to the identity matrix;
	    var x = [M[0], M[1], M[2]];                // first column vector
	    var sgn = _sign(x[0]);                     // sign of first component of x (for stability)
	    var xNorm = _norm(x);                      // norm of first column vector
	    var v = [x[0] + sgn * xNorm, x[1], x[2]];  // v = x + sign(x[0])|x|e1
	    var mult = 2 / _normSquared(v);            // mult = 2/v'v

	    //bail out if our Matrix is singular
	    if (mult >= Infinity) {
	        return {translate: Transform.getTranslate(M), rotate: [0, 0, 0], scale: [0, 0, 0], skew: [0, 0, 0]};
	    }

	    //evaluate Q1 = I - 2vv'/v'v
	    var Q1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

	    //diagonals
	    Q1[0]  = 1 - mult * v[0] * v[0];    // 0,0 entry
	    Q1[5]  = 1 - mult * v[1] * v[1];    // 1,1 entry
	    Q1[10] = 1 - mult * v[2] * v[2];    // 2,2 entry

	    //upper diagonal
	    Q1[1] = -mult * v[0] * v[1];        // 0,1 entry
	    Q1[2] = -mult * v[0] * v[2];        // 0,2 entry
	    Q1[6] = -mult * v[1] * v[2];        // 1,2 entry

	    //lower diagonal
	    Q1[4] = Q1[1];                      // 1,0 entry
	    Q1[8] = Q1[2];                      // 2,0 entry
	    Q1[9] = Q1[6];                      // 2,1 entry

	    //reduce first column of M
	    var MQ1 = Transform.multiply(Q1, M);

	    //SECOND ITERATION on (1,1) minor
	    var x2 = [MQ1[5], MQ1[6]];
	    var sgn2 = _sign(x2[0]);                    // sign of first component of x (for stability)
	    var x2Norm = _norm(x2);                     // norm of first column vector
	    var v2 = [x2[0] + sgn2 * x2Norm, x2[1]];    // v = x + sign(x[0])|x|e1
	    var mult2 = 2 / _normSquared(v2);           // mult = 2/v'v

	    //evaluate Q2 = I - 2vv'/v'v
	    var Q2 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

	    //diagonal
	    Q2[5]  = 1 - mult2 * v2[0] * v2[0]; // 1,1 entry
	    Q2[10] = 1 - mult2 * v2[1] * v2[1]; // 2,2 entry

	    //off diagonals
	    Q2[6] = -mult2 * v2[0] * v2[1];     // 2,1 entry
	    Q2[9] = Q2[6];                      // 1,2 entry

	    //calc QR decomposition. Q = Q1*Q2, R = Q'*M
	    var Q = Transform.multiply(Q2, Q1);      //note: really Q transpose
	    var R = Transform.multiply(Q, M);

	    //remove negative scaling
	    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
	    R = Transform.multiply(R, remover);
	    Q = Transform.multiply(remover, Q);

	    //decompose into rotate/scale/skew matrices
	    var result = {};
	    result.translate = Transform.getTranslate(M);
	    result.rotate = [Math.atan2(-Q[6], Q[10]), Math.asin(Q[2]), Math.atan2(-Q[1], Q[0])];
	    if (!result.rotate[0]) {
	        result.rotate[0] = 0;
	        result.rotate[2] = Math.atan2(Q[4], Q[5]);
	    }
	    result.scale = [R[0], R[5], R[10]];
	    result.skew = [Math.atan2(R[9], result.scale[2]), Math.atan2(R[8], result.scale[2]), Math.atan2(R[4], result.scale[0])];

	    //double rotation workaround
	    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
	        result.rotate[1] = Math.PI - result.rotate[1];
	        if (result.rotate[1] > Math.PI) result.rotate[1] -= 2 * Math.PI;
	        if (result.rotate[1] < -Math.PI) result.rotate[1] += 2 * Math.PI;
	        if (result.rotate[0] < 0) result.rotate[0] += Math.PI;
	        else result.rotate[0] -= Math.PI;
	        if (result.rotate[2] < 0) result.rotate[2] += Math.PI;
	        else result.rotate[2] -= Math.PI;
	    }

	    return result;
	};

	/**
	 * Weighted average between two matrices by averaging their
	 *     translation, rotation, scale, skew components.
	 *     f(M1,M2,t) = (1 - t) * M1 + t * M2
	 *
	 * @method average
	 * @static
	 * @param {Transform} M1 f(M1,M2,0) = M1
	 * @param {Transform} M2 f(M1,M2,1) = M2
	 * @param {Number} t
	 * @return {Transform}
	 */
	Transform.average = function average(M1, M2, t) {
	    t = (t === undefined) ? 0.5 : t;
	    var specM1 = Transform.interpret(M1);
	    var specM2 = Transform.interpret(M2);

	    var specAvg = {
	        translate: [0, 0, 0],
	        rotate: [0, 0, 0],
	        scale: [0, 0, 0],
	        skew: [0, 0, 0]
	    };

	    for (var i = 0; i < 3; i++) {
	        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
	        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
	        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
	        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
	    }
	    return Transform.build(specAvg);
	};

	/**
	 * Compose .translate, .rotate, .scale, .skew components into
	 * Transform matrix
	 *
	 * @method build
	 * @static
	 * @param {matrixSpec} spec object with component matrices .translate,
	 *    .rotate, .scale, .skew
	 * @return {Transform} composed transform
	 */
	Transform.build = function build(spec) {
	    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
	    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
	    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
	    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
	};

	/**
	 * Determine if two Transforms are component-wise equal
	 *   Warning: breaks on perspective Transforms
	 *
	 * @method equals
	 * @static
	 * @param {Transform} a matrix
	 * @param {Transform} b matrix
	 * @return {boolean}
	 */
	Transform.equals = function equals(a, b) {
	    return !Transform.notEquals(a, b);
	};

	/**
	 * Determine if two Transforms are component-wise unequal
	 *   Warning: breaks on perspective Transforms
	 *
	 * @method notEquals
	 * @static
	 * @param {Transform} a matrix
	 * @param {Transform} b matrix
	 * @return {boolean}
	 */
	Transform.notEquals = function notEquals(a, b) {
	    if (a === b) return false;

	    // shortci
	    return !(a && b) ||
	        a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] ||
	        a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] ||
	        a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] ||
	        a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
	};

	/**
	 * Constrain angle-trio components to range of [-pi, pi).
	 *
	 * @method normalizeRotation
	 * @static
	 * @param {Array.Number} rotation phi, theta, psi (array of floats
	 *    && array.length == 3)
	 * @return {Array.Number} new phi, theta, psi triplet
	 *    (array of floats && array.length == 3)
	 */
	Transform.normalizeRotation = function normalizeRotation(rotation) {
	    var result = rotation.slice(0);
	    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
	        result[0] = -result[0];
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] > Math.PI * 0.5) {
	        result[0] = result[0] - Math.PI;
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] < -Math.PI * 0.5) {
	        result[0] = result[0] + Math.PI;
	        result[1] = -Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    while (result[1] < -Math.PI) result[1] += 2 * Math.PI;
	    while (result[1] >= Math.PI) result[1] -= 2 * Math.PI;
	    while (result[2] < -Math.PI) result[2] += 2 * Math.PI;
	    while (result[2] >= Math.PI) result[2] -= 2 * Math.PI;
	    return result;
	};

	/**
	 * (Property) Array defining a translation forward in z by 1
	 *
	 * @property {array} inFront
	 * @static
	 * @final
	 */
	Transform.inFront = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1e-3, 1];

	/**
	 * (Property) Array defining a translation backwards in z by 1
	 *
	 * @property {array} behind
	 * @static
	 * @final
	 */
	Transform.behind = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1e-3, 1];

	module.exports = Transform;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Surface = __webpack_require__(18);

	/**
	 * A surface containing image content.
	 *   This extends the Surface class.
	 *
	 * @class ImageSurface
	 *
	 * @extends Surface
	 * @constructor
	 * @param {Object} [options] overrides of default options
	 */
	function ImageSurface(options) {
	    this._imageUrl = undefined;
	    Surface.apply(this, arguments);
	}

	ImageSurface.prototype = Object.create(Surface.prototype);
	ImageSurface.prototype.constructor = ImageSurface;
	ImageSurface.prototype.elementType = 'img';
	ImageSurface.prototype.elementClass = 'famous-surface';

	/**
	 * Set content URL.  This will cause a re-rendering.
	 * @method setContent
	 * @param {string} imageUrl
	 */
	ImageSurface.prototype.setContent = function setContent(imageUrl) {
	    this._imageUrl = imageUrl;
	    this._contentDirty = true;
	};

	/**
	 * Place the document element that this component manages into the document.
	 *
	 * @private
	 * @method deploy
	 * @param {Node} target document parent of this container
	 */
	ImageSurface.prototype.deploy = function deploy(target) {
	    target.src = this._imageUrl || '';
	};

	/**
	 * Remove this component and contained content from the document
	 *
	 * @private
	 * @method recall
	 *
	 * @param {Node} target node to which the component was deployed
	 */
	ImageSurface.prototype.recall = function recall(target) {
	    target.src = '';
	};

	module.exports = ImageSurface;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "boilerplate/index.html"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(19)
		// The css code:
		(__webpack_require__(12))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"html {\n  background: #fff;\n}\n\n.double-sided {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(19)
		// The css code:
		(__webpack_require__(14))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n\nhtml {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\nbody {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-perspective: 0;\n    perspective: none;\n    overflow: hidden;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: flat;\n    transform-style: preserve-3d; /* performance */\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var RenderNode = __webpack_require__(26);
	var EventHandler = __webpack_require__(16);
	var ElementAllocator = __webpack_require__(27);
	var Transform = __webpack_require__(6);
	var Transitionable = __webpack_require__(20);

	var _originZeroZero = [0, 0];

	function _getElementSize(element) {
	    return [element.clientWidth, element.clientHeight];
	}

	/**
	 * The top-level container for a Famous-renderable piece of the document.
	 *   It is directly updated by the process-wide Engine object, and manages one
	 *   render tree root, which can contain other renderables.
	 *
	 * @class Context
	 * @constructor
	 * @private
	 * @param {Node} container Element in which content will be inserted
	 */
	function Context(container) {
	    this.container = container;
	    this._allocator = new ElementAllocator(container);

	    this._node = new RenderNode();
	    this._eventOutput = new EventHandler();
	    this._size = _getElementSize(this.container);

	    this._perspectiveState = new Transitionable(0);
	    this._perspective = undefined;

	    this._nodeContext = {
	        allocator: this._allocator,
	        transform: Transform.identity,
	        opacity: 1,
	        origin: _originZeroZero,
	        align: null,
	        size: this._size
	    };

	    this._eventOutput.on('resize', function() {
	        this.setSize(_getElementSize(this.container));
	    }.bind(this));

	}

	// Note: Unused
	Context.prototype.getAllocator = function getAllocator() {
	    return this._allocator;
	};

	/**
	 * Add renderables to this Context's render tree.
	 *
	 * @method add
	 *
	 * @param {Object} obj renderable object
	 * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
	 */
	Context.prototype.add = function add(obj) {
	    return this._node.add(obj);
	};

	/**
	 * Move this Context to another containing document element.
	 *
	 * @method migrate
	 *
	 * @param {Node} container Element to which content will be migrated
	 */
	Context.prototype.migrate = function migrate(container) {
	    if (container === this.container) return;
	    this.container = container;
	    this._allocator.migrate(container);
	};

	/**
	 * Gets viewport size for Context.
	 *
	 * @method getSize
	 *
	 * @return {Array.Number} viewport size as [width, height]
	 */
	Context.prototype.getSize = function getSize() {
	    return this._size;
	};

	/**
	 * Sets viewport size for Context.
	 *
	 * @method setSize
	 *
	 * @param {Array.Number} size [width, height].  If unspecified, use size of root document element.
	 */
	Context.prototype.setSize = function setSize(size) {
	    if (!size) size = _getElementSize(this.container);
	    this._size[0] = size[0];
	    this._size[1] = size[1];
	};

	/**
	 * Commit this Context's content changes to the document.
	 *
	 * @private
	 * @method update
	 * @param {Object} contextParameters engine commit specification
	 */
	Context.prototype.update = function update(contextParameters) {
	    if (contextParameters) {
	        if (contextParameters.transform) this._nodeContext.transform = contextParameters.transform;
	        if (contextParameters.opacity) this._nodeContext.opacity = contextParameters.opacity;
	        if (contextParameters.origin) this._nodeContext.origin = contextParameters.origin;
	        if (contextParameters.align) this._nodeContext.align = contextParameters.align;
	        if (contextParameters.size) this._nodeContext.size = contextParameters.size;
	    }
	    var perspective = this._perspectiveState.get();
	    if (perspective !== this._perspective) {
	        this.container.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
	        this.container.style.webkitPerspective = perspective ? perspective.toFixed() : '';
	        this._perspective = perspective;
	    }

	    this._node.commit(this._nodeContext);
	};

	/**
	 * Get current perspective of this context in pixels.
	 *
	 * @method getPerspective
	 * @return {Number} depth perspective in pixels
	 */
	Context.prototype.getPerspective = function getPerspective() {
	    return this._perspectiveState.get();
	};

	/**
	 * Set current perspective of this context in pixels.
	 *
	 * @method setPerspective
	 * @param {Number} perspective in pixels
	 * @param {Object} [transition] Transitionable object for applying the change
	 * @param {function(Object)} callback function called on completion of transition
	 */
	Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
	    return this._perspectiveState.set(perspective, transition, callback);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	Context.prototype.emit = function emit(type, event) {
	    return this._eventOutput.emit(type, event);
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	Context.prototype.on = function on(type, handler) {
	    return this._eventOutput.on(type, handler);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function} handler function object to remove
	 * @return {EventHandler} internal event handler object (for chaining)
	 */
	Context.prototype.removeListener = function removeListener(type, handler) {
	    return this._eventOutput.removeListener(type, handler);
	};

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	Context.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe".
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	Context.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};

	module.exports = Context;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var EventEmitter = __webpack_require__(28);

	/**
	 * EventHandler forwards received events to a set of provided callback functions.
	 * It allows events to be captured, processed, and optionally piped through to other event handlers.
	 *
	 * @class EventHandler
	 * @extends EventEmitter
	 * @constructor
	 */
	function EventHandler() {
	    EventEmitter.apply(this, arguments);

	    this.downstream = []; // downstream event handlers
	    this.downstreamFn = []; // downstream functions

	    this.upstream = []; // upstream event handlers
	    this.upstreamListeners = {}; // upstream listeners
	}
	EventHandler.prototype = Object.create(EventEmitter.prototype);
	EventHandler.prototype.constructor = EventHandler;

	/**
	 * Assign an event handler to receive an object's input events.
	 *
	 * @method setInputHandler
	 * @static
	 *
	 * @param {Object} object object to mix trigger, subscribe, and unsubscribe functions into
	 * @param {EventHandler} handler assigned event handler
	 */
	EventHandler.setInputHandler = function setInputHandler(object, handler) {
	    object.trigger = handler.trigger.bind(handler);
	    if (handler.subscribe && handler.unsubscribe) {
	        object.subscribe = handler.subscribe.bind(handler);
	        object.unsubscribe = handler.unsubscribe.bind(handler);
	    }
	};

	/**
	 * Assign an event handler to receive an object's output events.
	 *
	 * @method setOutputHandler
	 * @static
	 *
	 * @param {Object} object object to mix pipe, unpipe, on, addListener, and removeListener functions into
	 * @param {EventHandler} handler assigned event handler
	 */
	EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
	    if (handler instanceof EventHandler) handler.bindThis(object);
	    object.pipe = handler.pipe.bind(handler);
	    object.unpipe = handler.unpipe.bind(handler);
	    object.on = handler.on.bind(handler);
	    object.addListener = object.on;
	    object.removeListener = handler.removeListener.bind(handler);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	EventHandler.prototype.emit = function emit(type, event) {
	    EventEmitter.prototype.emit.apply(this, arguments);
	    var i = 0;
	    for (i = 0; i < this.downstream.length; i++) {
	        if (this.downstream[i].trigger) this.downstream[i].trigger(type, event);
	    }
	    for (i = 0; i < this.downstreamFn.length; i++) {
	        this.downstreamFn[i](type, event);
	    }
	    return this;
	};

	/**
	 * Alias for emit
	 * @method addListener
	 */
	EventHandler.prototype.trigger = EventHandler.prototype.emit;

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	EventHandler.prototype.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function) return target.subscribe(this);

	    var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index < 0) downstreamCtx.push(target);

	    if (target instanceof Function) target('pipe', null);
	    else if (target.trigger) target.trigger('pipe', null);

	    return target;
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe".
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	EventHandler.prototype.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function) return target.unsubscribe(this);

	    var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index >= 0) {
	        downstreamCtx.splice(index, 1);
	        if (target instanceof Function) target('unpipe', null);
	        else if (target.trigger) target.trigger('unpipe', null);
	        return target;
	    }
	    else return false;
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	EventHandler.prototype.on = function on(type, handler) {
	    EventEmitter.prototype.on.apply(this, arguments);
	    if (!(type in this.upstreamListeners)) {
	        var upstreamListener = this.trigger.bind(this, type);
	        this.upstreamListeners[type] = upstreamListener;
	        for (var i = 0; i < this.upstream.length; i++) {
	            this.upstream[i].on(type, upstreamListener);
	        }
	    }
	    return this;
	};

	/**
	 * Alias for "on"
	 * @method addListener
	 */
	EventHandler.prototype.addListener = EventHandler.prototype.on;

	/**
	 * Listen for events from an upstream event handler.
	 *
	 * @method subscribe
	 *
	 * @param {EventEmitter} source source emitter object
	 * @return {EventHandler} this
	 */
	EventHandler.prototype.subscribe = function subscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index < 0) {
	        this.upstream.push(source);
	        for (var type in this.upstreamListeners) {
	            source.on(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};

	/**
	 * Stop listening to events from an upstream event handler.
	 *
	 * @method unsubscribe
	 *
	 * @param {EventEmitter} source source emitter object
	 * @return {EventHandler} this
	 */
	EventHandler.prototype.unsubscribe = function unsubscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index >= 0) {
	        this.upstream.splice(index, 1);
	        for (var type in this.upstreamListeners) {
	            source.removeListener(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};

	module.exports = EventHandler;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var EventHandler = __webpack_require__(16);

	/**
	 *  A collection of methods for setting options which can be extended
	 *  onto other classes.
	 *
	 *
	 *  **** WARNING ****
	 *  You can only pass through objects that will compile into valid JSON.
	 *
	 *  Valid options:
	 *      Strings,
	 *      Arrays,
	 *      Objects,
	 *      Numbers,
	 *      Nested Objects,
	 *      Nested Arrays.
	 *
	 *    This excludes:
	 *        Document Fragments,
	 *        Functions
	 * @class OptionsManager
	 * @constructor
	 * @param {Object} value options dictionary
	 */
	function OptionsManager(value) {
	    this._value = value;
	    this.eventOutput = null;
	}

	/**
	 * Create options manager from source dictionary with arguments overriden by patch dictionary.
	 *
	 * @static
	 * @method OptionsManager.patch
	 *
	 * @param {Object} source source arguments
	 * @param {...Object} data argument additions and overwrites
	 * @return {Object} source object
	 */
	OptionsManager.patch = function patchObject(source, data) {
	    var manager = new OptionsManager(source);
	    for (var i = 1; i < arguments.length; i++) manager.patch(arguments[i]);
	    return source;
	};

	function _createEventOutput() {
	    this.eventOutput = new EventHandler();
	    this.eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this.eventOutput);
	}

	/**
	 * Create OptionsManager from source with arguments overriden by patches.
	 *   Triggers 'change' event on this object's event handler if the state of
	 *   the OptionsManager changes as a result.
	 *
	 * @method patch
	 *
	 * @param {...Object} arguments list of patch objects
	 * @return {OptionsManager} this
	 */
	OptionsManager.prototype.patch = function patch() {
	    var myState = this._value;
	    for (var i = 0; i < arguments.length; i++) {
	        var data = arguments[i];
	        for (var k in data) {
	            if ((k in myState) && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
	                if (!myState.hasOwnProperty(k)) myState[k] = Object.create(myState[k]);
	                this.key(k).patch(data[k]);
	                if (this.eventOutput) this.eventOutput.emit('change', {id: k, value: this.key(k).value()});
	            }
	            else this.set(k, data[k]);
	        }
	    }
	    return this;
	};

	/**
	 * Alias for patch
	 *
	 * @method setOptions
	 *
	 */
	OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;

	/**
	 * Return OptionsManager based on sub-object retrieved by key
	 *
	 * @method key
	 *
	 * @param {string} identifier key
	 * @return {OptionsManager} new options manager with the value
	 */
	OptionsManager.prototype.key = function key(identifier) {
	    var result = new OptionsManager(this._value[identifier]);
	    if (!(result._value instanceof Object) || result._value instanceof Array) result._value = {};
	    return result;
	};

	/**
	 * Look up value by key
	 * @method get
	 *
	 * @param {string} key key
	 * @return {Object} associated object
	 */
	OptionsManager.prototype.get = function get(key) {
	    return this._value[key];
	};

	/**
	 * Alias for get
	 * @method getOptions
	 */
	OptionsManager.prototype.getOptions = OptionsManager.prototype.get;

	/**
	 * Set key to value.  Outputs 'change' event if a value is overwritten.
	 *
	 * @method set
	 *
	 * @param {string} key key string
	 * @param {Object} value value object
	 * @return {OptionsManager} new options manager based on the value object
	 */
	OptionsManager.prototype.set = function set(key, value) {
	    var originalValue = this.get(key);
	    this._value[key] = value;
	    if (this.eventOutput && value !== originalValue) this.eventOutput.emit('change', {id: key, value: value});
	    return this;
	};

	/**
	 * Return entire object contents of this OptionsManager.
	 *
	 * @method value
	 *
	 * @return {Object} current state of options
	 */
	OptionsManager.prototype.value = function value() {
	    return this._value;
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'change')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	OptionsManager.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'change')
	 * @param {function} handler function object to remove
	 * @return {EventHandler} internal event handler object (for chaining)
	 */
	OptionsManager.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	OptionsManager.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 * Undoes work of "pipe"
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	OptionsManager.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};

	module.exports = OptionsManager;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Entity = __webpack_require__(29);
	var EventHandler = __webpack_require__(16);
	var Transform = __webpack_require__(6);

	var devicePixelRatio = window.devicePixelRatio || 1;
	var usePrefix = document.createElement('div').style.webkitTransform !== undefined;

	/**
	 * A base class for viewable content and event
	 *   targets inside a Famo.us application, containing a renderable document
	 *   fragment. Like an HTML div, it can accept internal markup,
	 *   properties, classes, and handle events.
	 *
	 * @class Surface
	 * @constructor
	 *
	 * @param {Object} [options] default option overrides
	 * @param {Array.Number} [options.size] [width, height] in pixels
	 * @param {Array.string} [options.classes] CSS classes to set on inner content
	 * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
	 * @param {string} [options.content] inner (HTML) content of surface
	 */
	function Surface(options) {
	    this.options = {};

	    this.properties = {};
	    this.content = '';
	    this.classList = [];
	    this.size = null;

	    this._classesDirty = true;
	    this._stylesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;

	    this._dirtyClasses = [];

	    this._matrix = null;
	    this._opacity = 1;
	    this._origin = null;
	    this._size = null;

	    /** @ignore */
	    this.eventForwarder = function eventForwarder(event) {
	        this.emit(event.type, event);
	    }.bind(this);
	    this.eventHandler = new EventHandler();
	    this.eventHandler.bindThis(this);

	    this.id = Entity.register(this);

	    if (options) this.setOptions(options);

	    this._currTarget = null;
	}
	Surface.prototype.elementType = 'div';
	Surface.prototype.elementClass = 'famous-surface';

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} fn handler callback
	 * @return {EventHandler} this
	 */
	Surface.prototype.on = function on(type, fn) {
	    if (this._currTarget) this._currTarget.addEventListener(type, this.eventForwarder);
	    this.eventHandler.on(type, fn);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on"
	 *
	 * @method removeListener
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} fn handler
	 */
	Surface.prototype.removeListener = function removeListener(type, fn) {
	    this.eventHandler.removeListener(type, fn);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} [event] event data
	 * @return {EventHandler} this
	 */
	Surface.prototype.emit = function emit(type, event) {
	    if (event && !event.origin) event.origin = this;
	    var handled = this.eventHandler.emit(type, event);
	    if (handled && event && event.stopPropagation) event.stopPropagation();
	    return handled;
	};

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	Surface.prototype.pipe = function pipe(target) {
	    return this.eventHandler.pipe(target);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe"
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	Surface.prototype.unpipe = function unpipe(target) {
	    return this.eventHandler.unpipe(target);
	};

	/**
	 * Return spec for this surface. Note that for a base surface, this is
	 *    simply an id.
	 *
	 * @method render
	 * @private
	 * @return {Object} render spec for this surface (spec id)
	 */
	Surface.prototype.render = function render() {
	    return this.id;
	};

	/**
	 * Set CSS-style properties on this Surface. Note that this will cause
	 *    dirtying and thus re-rendering, even if values do not change.
	 *
	 * @method setProperties
	 * @param {Object} properties property dictionary of "key" => "value"
	 */
	Surface.prototype.setProperties = function setProperties(properties) {
	    for (var n in properties) {
	        this.properties[n] = properties[n];
	    }
	    this._stylesDirty = true;
	};

	/**
	 * Get CSS-style properties on this Surface.
	 *
	 * @method getProperties
	 *
	 * @return {Object} Dictionary of this Surface's properties.
	 */
	Surface.prototype.getProperties = function getProperties() {
	    return this.properties;
	};

	/**
	 * Add CSS-style class to the list of classes on this Surface. Note
	 *   this will map directly to the HTML property of the actual
	 *   corresponding rendered <div>.
	 *
	 * @method addClass
	 * @param {string} className name of class to add
	 */
	Surface.prototype.addClass = function addClass(className) {
	    if (this.classList.indexOf(className) < 0) {
	        this.classList.push(className);
	        this._classesDirty = true;
	    }
	};

	/**
	 * Remove CSS-style class from the list of classes on this Surface.
	 *   Note this will map directly to the HTML property of the actual
	 *   corresponding rendered <div>.
	 *
	 * @method removeClass
	 * @param {string} className name of class to remove
	 */
	Surface.prototype.removeClass = function removeClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
	        this._classesDirty = true;
	    }
	};

	/**
	 * Reset class list to provided dictionary.
	 * @method setClasses
	 * @param {Array.string} classList
	 */
	Surface.prototype.setClasses = function setClasses(classList) {
	    var i = 0;
	    var removal = [];
	    for (i = 0; i < this.classList.length; i++) {
	        if (classList.indexOf(this.classList[i]) < 0) removal.push(this.classList[i]);
	    }
	    for (i = 0; i < removal.length; i++) this.removeClass(removal[i]);
	    // duplicates are already checked by addClass()
	    for (i = 0; i < classList.length; i++) this.addClass(classList[i]);
	};

	/**
	 * Get array of CSS-style classes attached to this div.
	 *
	 * @method getClasslist
	 * @return {Array.string} array of class names
	 */
	Surface.prototype.getClassList = function getClassList() {
	    return this.classList;
	};

	/**
	 * Set or overwrite inner (HTML) content of this surface. Note that this
	 *    causes a re-rendering if the content has changed.
	 *
	 * @method setContent
	 * @param {string|Document Fragment} content HTML content
	 */
	Surface.prototype.setContent = function setContent(content) {
	    if (this.content !== content) {
	        this.content = content;
	        this._contentDirty = true;
	    }
	};

	/**
	 * Return inner (HTML) content of this surface.
	 *
	 * @method getContent
	 *
	 * @return {string} inner (HTML) content
	 */
	Surface.prototype.getContent = function getContent() {
	    return this.content;
	};

	/**
	 * Set options for this surface
	 *
	 * @method setOptions
	 * @param {Object} [options] overrides for default options.  See constructor.
	 */
	Surface.prototype.setOptions = function setOptions(options) {
	    if (options.size) this.setSize(options.size);
	    if (options.classes) this.setClasses(options.classes);
	    if (options.properties) this.setProperties(options.properties);
	    if (options.content) this.setContent(options.content);
	};

	//  Attach Famous event handling to document events emanating from target
	//    document element.  This occurs just after deployment to the document.
	//    Calling this enables methods like #on and #pipe.
	function _addEventListeners(target) {
	    for (var i in this.eventHandler.listeners) {
	        target.addEventListener(i, this.eventForwarder);
	    }
	}

	//  Detach Famous event handling from document events emanating from target
	//  document element.  This occurs just before recall from the document.
	function _removeEventListeners(target) {
	    for (var i in this.eventHandler.listeners) {
	        target.removeEventListener(i, this.eventForwarder);
	    }
	}

	 //  Apply to document all changes from removeClass() since last setup().
	function _cleanupClasses(target) {
	    for (var i = 0; i < this._dirtyClasses.length; i++) target.classList.remove(this._dirtyClasses[i]);
	    this._dirtyClasses = [];
	}

	// Apply values of all Famous-managed styles to the document element.
	//  These will be deployed to the document on call to #setup().
	function _applyStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = this.properties[n];
	    }
	}

	// Clear all Famous-managed styles from the document element.
	// These will be deployed to the document on call to #setup().
	function _cleanupStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = '';
	    }
	}

	/**
	 * Return a Matrix's webkit css representation to be used with the
	 *    CSS3 -webkit-transform style.
	 *    Example: -webkit-transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,716,243,0,1)
	 *
	 * @method _formatCSSTransform
	 * @private
	 * @param {FamousMatrix} m matrix
	 * @return {string} matrix3d CSS style representation of the transform
	 */
	function _formatCSSTransform(m) {
	    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
	    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;

	    var result = 'matrix3d(';
	    for (var i = 0; i < 15; i++) {
	        result += (m[i] < 0.000001 && m[i] > -0.000001) ? '0,' : m[i] + ',';
	    }
	    result += m[15] + ')';
	    return result;
	}

	/**
	 * Directly apply given FamousMatrix to the document element as the
	 *   appropriate webkit CSS style.
	 *
	 * @method setMatrix
	 *
	 * @static
	 * @private
	 * @param {Element} element document element
	 * @param {FamousMatrix} matrix
	 */

	var _setMatrix;
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	    _setMatrix = function(element, matrix) {
	        element.style.zIndex = (matrix[14] * 1000000) | 0;    // fix for Firefox z-buffer issues
	        element.style.transform = _formatCSSTransform(matrix);
	    };
	}
	else if (usePrefix) {
	    _setMatrix = function(element, matrix) {
	        element.style.webkitTransform = _formatCSSTransform(matrix);
	    };
	}
	else {
	    _setMatrix = function(element, matrix) {
	        element.style.transform = _formatCSSTransform(matrix);
	    };
	}

	// format origin as CSS percentage string
	function _formatCSSOrigin(origin) {
	    return (100 * origin[0]) + '% ' + (100 * origin[1]) + '%';
	}

	 // Directly apply given origin coordinates to the document element as the
	 // appropriate webkit CSS style.
	var _setOrigin = usePrefix ? function(element, origin) {
	    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
	} : function(element, origin) {
	    element.style.transformOrigin = _formatCSSOrigin(origin);
	};

	 // Shrink given document element until it is effectively invisible.
	var _setInvisible = usePrefix ? function(element) {
	    element.style.webkitTransform = 'scale3d(0.0001,0.0001,1)';
	    element.style.opacity = 0;
	} : function(element) {
	    element.style.transform = 'scale3d(0.0001,0.0001,1)';
	    element.style.opacity = 0;
	};

	function _xyNotEquals(a, b) {
	    return (a && b) ? (a[0] !== b[0] || a[1] !== b[1]) : a !== b;
	}

	/**
	 * One-time setup for an element to be ready for commits to document.
	 *
	 * @private
	 * @method setup
	 *
	 * @param {ElementAllocator} allocator document element pool for this context
	 */
	Surface.prototype.setup = function setup(allocator) {
	    var target = allocator.allocate(this.elementType);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (var i = 0; i < this.elementClass.length; i++) {
	                target.classList.add(this.elementClass[i]);
	            }
	        }
	        else {
	            target.classList.add(this.elementClass);
	        }
	    }
	    target.style.display = '';
	    _addEventListeners.call(this, target);
	    this._currTarget = target;
	    this._stylesDirty = true;
	    this._classesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._matrix = null;
	    this._opacity = undefined;
	    this._origin = null;
	    this._size = null;
	};

	/**
	 * Apply changes from this component to the corresponding document element.
	 * This includes changes to classes, styles, size, content, opacity, origin,
	 * and matrix transforms.
	 *
	 * @private
	 * @method commit
	 * @param {Context} context commit context
	 */
	Surface.prototype.commit = function commit(context) {
	    if (!this._currTarget) this.setup(context.allocator);
	    var target = this._currTarget;

	    var matrix = context.transform;
	    var opacity = context.opacity;
	    var origin = context.origin;
	    var size = context.size;

	    if (this._classesDirty) {
	        _cleanupClasses.call(this, target);
	        var classList = this.getClassList();
	        for (var i = 0; i < classList.length; i++) target.classList.add(classList[i]);
	        this._classesDirty = false;
	    }

	    if (this._stylesDirty) {
	        _applyStyles.call(this, target);
	        this._stylesDirty = false;
	    }

	    if (this._contentDirty) {
	        this.deploy(target);
	        this.eventHandler.emit('deploy');
	        this._contentDirty = false;
	    }

	    if (this.size) {
	        var origSize = size;
	        size = [this.size[0], this.size[1]];
	        if (size[0] === undefined && origSize[0]) size[0] = origSize[0];
	        if (size[1] === undefined && origSize[1]) size[1] = origSize[1];
	    }

	    if (size[0] === true) size[0] = target.clientWidth;
	    if (size[1] === true) size[1] = target.clientHeight;

	    if (_xyNotEquals(this._size, size)) {
	        if (!this._size) this._size = [0, 0];
	        this._size[0] = size[0];
	        this._size[1] = size[1];
	        this._sizeDirty = true;
	    }

	    if (!matrix && this._matrix) {
	        this._matrix = null;
	        this._opacity = 0;
	        _setInvisible(target);
	        return;
	    }

	    if (this._opacity !== opacity) {
	        this._opacity = opacity;
	        target.style.opacity = (opacity >= 1) ? '0.999999' : opacity;
	    }

	    if (_xyNotEquals(this._origin, origin) || Transform.notEquals(this._matrix, matrix) || this._sizeDirty) {
	        if (!matrix) matrix = Transform.identity;
	        this._matrix = matrix;
	        var aaMatrix = matrix;
	        if (origin) {
	            if (!this._origin) this._origin = [0, 0];
	            this._origin[0] = origin[0];
	            this._origin[1] = origin[1];
	            aaMatrix = Transform.thenMove(matrix, [-this._size[0] * origin[0], -this._size[1] * origin[1], 0]);
	            _setOrigin(target, origin);
	        }
	        _setMatrix(target, aaMatrix);
	    }

	    if (this._sizeDirty) {
	        if (this._size) {
	            target.style.width = (this.size && this.size[0] === true) ? '' : this._size[0] + 'px';
	            target.style.height = (this.size && this.size[1] === true) ?  '' : this._size[1] + 'px';
	        }
	        this._sizeDirty = false;
	    }
	};

	/**
	 *  Remove all Famous-relevant attributes from a document element.
	 *    This is called by SurfaceManager's detach().
	 *    This is in some sense the reverse of .deploy().
	 *
	 * @private
	 * @method cleanup
	 * @param {ElementAllocator} allocator
	 */
	Surface.prototype.cleanup = function cleanup(allocator) {
	    var i = 0;
	    var target = this._currTarget;
	    this.eventHandler.emit('recall');
	    this.recall(target);
	    target.style.display = 'none';
	    target.style.width = '';
	    target.style.height = '';
	    this._size = null;
	    _cleanupStyles.call(this, target);
	    var classList = this.getClassList();
	    _cleanupClasses.call(this, target);
	    for (i = 0; i < classList.length; i++) target.classList.remove(classList[i]);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (i = 0; i < this.elementClass.length; i++) {
	                target.classList.remove(this.elementClass[i]);
	            }
	        }
	        else {
	            target.classList.remove(this.elementClass);
	        }
	    }
	    _removeEventListeners.call(this, target);
	    this._currTarget = null;
	    allocator.deallocate(target);
	    _setInvisible(target);
	};

	/**
	 * Place the document element that this component manages into the document.
	 *
	 * @private
	 * @method deploy
	 * @param {Node} target document parent of this container
	 */
	Surface.prototype.deploy = function deploy(target) {
	    var content = this.getContent();
	    if (content instanceof Node) {
	        while (target.hasChildNodes()) target.removeChild(target.firstChild);
	        target.appendChild(content);
	    }
	    else target.innerHTML = content;
	};

	/**
	 * Remove any contained document content associated with this surface
	 *   from the actual document.
	 *
	 * @private
	 * @method recall
	 */
	Surface.prototype.recall = function recall(target) {
	    var df = document.createDocumentFragment();
	    while (target.hasChildNodes()) df.appendChild(target.firstChild);
	    this.setContent(df);
	};

	/**
	 *  Get the x and y dimensions of the surface.
	 *
	 * @method getSize
	 * @param {boolean} actual return computed size rather than provided
	 * @return {Array.Number} [x,y] size of surface
	 */
	Surface.prototype.getSize = function getSize(actual) {
	    return actual ? this._size : (this.size || this._size);
	};

	/**
	 * Set x and y dimensions of the surface.
	 *
	 * @method setSize
	 * @param {Array.Number} size as [width, height]
	 */
	Surface.prototype.setSize = function setSize(size) {
	    this.size = size ? [size[0], size[1]] : null;
	    this._sizeDirty = true;
	};

	module.exports = Surface;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		return function() {
			head.removeChild(styleElement);
		};
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var MultipleTransition = __webpack_require__(30);
	var TweenTransition = __webpack_require__(31);

	/**
	 * A state maintainer for a smooth transition between
	 *    numerically-specified states. Example numeric states include floats or
	 *    Transform objects.
	 *
	 * An initial state is set with the constructor or set(startState). A
	 *    corresponding end state and transition are set with set(endState,
	 *    transition). Subsequent calls to set(endState, transition) begin at
	 *    the last state. Calls to get(timestamp) provide the interpolated state
	 *    along the way.
	 *
	 * Note that there is no event loop here - calls to get() are the only way
	 *    to find state projected to the current (or provided) time and are
	 *    the only way to trigger callbacks. Usually this kind of object would
	 *    be part of the render() path of a visible component.
	 *
	 * @class Transitionable
	 * @constructor
	 * @param {number|Array.Number|Object.<number|string, number>} start
	 *    beginning state
	 */
	function Transitionable(start) {
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];

	    this.state = 0;
	    this.velocity = undefined;
	    this._callback = undefined;
	    this._engineInstance = null;
	    this._currentMethod = null;

	    this.set(start);
	}

	var transitionMethods = {};

	Transitionable.registerMethod = function registerMethod(name, engineClass) {
	    if (!(name in transitionMethods)) {
	        transitionMethods[name] = engineClass;
	        return true;
	    }
	    else return false;
	};

	Transitionable.unregisterMethod = function unregisterMethod(name) {
	    if (name in transitionMethods) {
	        delete transitionMethods[name];
	        return true;
	    }
	    else return false;
	};

	function _loadNext() {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    if (this.actionQueue.length <= 0) {
	        this.set(this.get()); // no update required
	        return;
	    }
	    this.currentAction = this.actionQueue.shift();
	    this._callback = this.callbackQueue.shift();

	    var method = null;
	    var endValue = this.currentAction[0];
	    var transition = this.currentAction[1];
	    if (transition instanceof Object && transition.method) {
	        method = transition.method;
	        if (typeof method === 'string') method = transitionMethods[method];
	    }
	    else {
	        method = TweenTransition;
	    }

	    if (this._currentMethod !== method) {
	        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
	            this._engineInstance = new method();
	        }
	        else {
	            this._engineInstance = new MultipleTransition(method);
	        }
	        this._currentMethod = method;
	    }

	    this._engineInstance.reset(this.state, this.velocity);
	    if (this.velocity !== undefined) transition.velocity = this.velocity;
	    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
	}

	/**
	 * Add transition to end state to the queue of pending transitions. Special
	 *    Use: calling without a transition resets the object to that state with
	 *    no pending actions
	 *
	 * @method set
	 *
	 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endState
	 *    end state to which we interpolate
	 * @param {transition=} transition object of type {duration: number, curve:
	 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	 *    instantaneous.
	 * @param {function()=} callback Zero-argument function to call on observed
	 *    completion (t=1)
	 */
	Transitionable.prototype.set = function set(endState, transition, callback) {
	    if (!transition) {
	        this.reset(endState);
	        if (callback) callback();
	        return this;
	    }

	    var action = [endState, transition];
	    this.actionQueue.push(action);
	    this.callbackQueue.push(callback);
	    if (!this.currentAction) _loadNext.call(this);
	    return this;
	};

	/**
	 * Cancel all transitions and reset to a stable state
	 *
	 * @method reset
	 *
	 * @param {number|Array.Number|Object.<number, number>} startState
	 *    stable state to set to
	 */
	Transitionable.prototype.reset = function reset(startState, startVelocity) {
	    this._currentMethod = null;
	    this._engineInstance = null;
	    this._callback = undefined;
	    this.state = startState;
	    this.velocity = startVelocity;
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	};

	/**
	 * Add delay action to the pending action queue queue.
	 *
	 * @method delay
	 *
	 * @param {number} duration delay time (ms)
	 * @param {function} callback Zero-argument function to call on observed
	 *    completion (t=1)
	 */
	Transitionable.prototype.delay = function delay(duration, callback) {
	    this.set(this.get(), {duration: duration,
	        curve: function() {
	            return 0;
	        }},
	        callback
	    );
	};

	/**
	 * Get interpolated state of current action at provided time. If the last
	 *    action has completed, invoke its callback.
	 *
	 * @method get
	 *
	 * @param {number=} timestamp Evaluate the curve at a normalized version of this
	 *    time. If omitted, use current time. (Unix epoch time)
	 * @return {number|Object.<number|string, number>} beginning state
	 *    interpolated to this point in time.
	 */
	Transitionable.prototype.get = function get(timestamp) {
	    if (this._engineInstance) {
	        if (this._engineInstance.getVelocity)
	            this.velocity = this._engineInstance.getVelocity();
	        this.state = this._engineInstance.get(timestamp);
	    }
	    return this.state;
	};

	/**
	 * Is there at least one action pending completion?
	 *
	 * @method isActive
	 *
	 * @return {boolean}
	 */
	Transitionable.prototype.isActive = function isActive() {
	    return !!this.currentAction;
	};

	/**
	 * Halt transition at current state and erase all pending actions.
	 *
	 * @method halt
	 */
	Transitionable.prototype.halt = function halt() {
	    this.set(this.get());
	};

	module.exports = Transitionable;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Transitionable = __webpack_require__(20);
	var Transform = __webpack_require__(6);
	var Utility = __webpack_require__(32);

	/**
	 * A class for transitioning the state of a Transform by transitioning
	 * its translate, scale, skew and rotate components independently.
	 *
	 * @class TransitionableTransform
	 * @constructor
	 *
	 * @param [transform=Transform.identity] {Transform} The initial transform state
	 */
	function TransitionableTransform(transform) {
	    this._final = Transform.identity.slice();
	    this.translate = new Transitionable([0, 0, 0]);
	    this.rotate = new Transitionable([0, 0, 0]);
	    this.skew = new Transitionable([0, 0, 0]);
	    this.scale = new Transitionable([1, 1, 1]);

	    if (transform) this.set(transform);
	}

	function _build() {
	    return Transform.build({
	        translate: this.translate.get(),
	        rotate: this.rotate.get(),
	        skew: this.skew.get(),
	        scale: this.scale.get()
	    });
	}

	/**
	 * An optimized way of setting only the translation component of a Transform
	 *
	 * @method setTranslate
	 * @chainable
	 *
	 * @param translate {Array}     New translation state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
	    this.translate.set(translate, transition, callback);
	    this._final = this._final.slice();
	    this._final[12] = translate[0];
	    this._final[13] = translate[1];
	    if (translate[2] !== undefined) this._final[14] = translate[2];
	    return this;
	};

	/**
	 * An optimized way of setting only the scale component of a Transform
	 *
	 * @method setScale
	 * @chainable
	 *
	 * @param scale {Array}         New scale state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
	    this.scale.set(scale, transition, callback);
	    this._final = this._final.slice();
	    this._final[0] = scale[0];
	    this._final[5] = scale[1];
	    if (scale[2] !== undefined) this._final[10] = scale[2];
	    return this;
	};

	/**
	 * An optimized way of setting only the rotational component of a Transform
	 *
	 * @method setRotate
	 * @chainable
	 *
	 * @param eulerAngles {Array}   Euler angles for new rotation state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
	    this.rotate.set(eulerAngles, transition, callback);
	    this._final = _build.call(this);
	    this._final = Transform.build({
	        translate: this.translate.get(),
	        rotate: eulerAngles,
	        scale: this.scale.get(),
	        skew: this.skew.get()
	    });
	    return this;
	};

	/**
	 * An optimized way of setting only the skew component of a Transform
	 *
	 * @method setSkew
	 * @chainable
	 *
	 * @param skewAngles {Array}    New skew state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
	    this.skew.set(skewAngles, transition, callback);
	    this._final = Transform.build({
	        translate: this.translate.get(),
	        rotate: this.rotate.get(),
	        scale: this.scale.get(),
	        skew: skewAngles
	    });
	    return this;
	};

	/**
	 * Setter for a TransitionableTransform with optional parameters to transition
	 * between Transforms
	 *
	 * @method set
	 * @chainable
	 *
	 * @param transform {Array}     New transform state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.set = function set(transform, transition, callback) {
	    this._final = transform;
	    var components = Transform.interpret(transform);

	    var _callback = callback ? Utility.after(4, callback) : null;
	    this.translate.set(components.translate, transition, _callback);
	    this.rotate.set(components.rotate, transition, _callback);
	    this.skew.set(components.skew, transition, _callback);
	    this.scale.set(components.scale, transition, _callback);
	    return this;
	};

	/**
	 * Sets the default transition to use for transitioning betwen Transform states
	 *
	 * @method setDefaultTransition
	 *
	 * @param transition {Object} Transition definition
	 */
	TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
	    this.translate.setDefault(transition);
	    this.rotate.setDefault(transition);
	    this.skew.setDefault(transition);
	    this.scale.setDefault(transition);
	};

	/**
	 * Getter. Returns the current state of the Transform
	 *
	 * @method get
	 *
	 * @return {Transform}
	 */
	TransitionableTransform.prototype.get = function get() {
	    if (this.isActive()) {
	        return _build.call(this);
	    }
	    else return this._final;
	};

	/**
	 * Get the destination state of the Transform
	 *
	 * @method getFinal
	 *
	 * @return Transform {Transform}
	 */
	TransitionableTransform.prototype.getFinal = function getFinal() {
	    return this._final;
	};

	/**
	 * Determine if the TransitionalTransform is currently transitioning
	 *
	 * @method isActive
	 *
	 * @return {Boolean}
	 */
	TransitionableTransform.prototype.isActive = function isActive() {
	    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
	};

	/**
	 * Halts the transition
	 *
	 * @method halt
	 */
	TransitionableTransform.prototype.halt = function halt() {
	    this._final = this.get();
	    this.translate.halt();
	    this.rotate.halt();
	    this.skew.halt();
	    this.scale.halt();
	};

	module.exports = TransitionableTransform;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 2011-06-15
	 *
	 * By Eli Grey, http://eligrey.com
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */

	/*global self, document, DOMException */

	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

	if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

	(function (view) {

	"use strict";

	var
	      classListProp = "classList"
	    , protoProp = "prototype"
	    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
	    , objCtr = Object
	    , strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	    }
	    , arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var
	              i = 0
	            , len = this.length
	        ;
	        for (; i < len; i++) {
	            if (i in this && this[i] === item) {
	                return i;
	            }
	        }
	        return -1;
	    }
	    // Vendors: please allow content code to instantiate DOMExceptions
	    , DOMEx = function (type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	    }
	    , checkTokenAndGetIndex = function (classList, token) {
	        if (token === "") {
	            throw new DOMEx(
	                  "SYNTAX_ERR"
	                , "An invalid or illegal string was specified"
	            );
	        }
	        if (/\s/.test(token)) {
	            throw new DOMEx(
	                  "INVALID_CHARACTER_ERR"
	                , "String contains an invalid character"
	            );
	        }
	        return arrIndexOf.call(classList, token);
	    }
	    , ClassList = function (elem) {
	        var
	              trimmedClasses = strTrim.call(elem.className)
	            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
	            , i = 0
	            , len = classes.length
	        ;
	        for (; i < len; i++) {
	            this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	            elem.className = this.toString();
	        };
	    }
	    , classListProto = ClassList[protoProp] = []
	    , classListGetter = function () {
	        return new ClassList(this);
	    }
	;
	// Most DOMException implementations don't allow calling DOMException's toString()
	// on non-DOMExceptions. Error's toString() is sufficient here.
	DOMEx[protoProp] = Error[protoProp];
	classListProto.item = function (i) {
	    return this[i] || null;
	};
	classListProto.contains = function (token) {
	    token += "";
	    return checkTokenAndGetIndex(this, token) !== -1;
	};
	classListProto.add = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.push(token);
	        this._updateClassName();
	    }
	};
	classListProto.remove = function (token) {
	    token += "";
	    var index = checkTokenAndGetIndex(this, token);
	    if (index !== -1) {
	        this.splice(index, 1);
	        this._updateClassName();
	    }
	};
	classListProto.toggle = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.add(token);
	    } else {
	        this.remove(token);
	    }
	};
	classListProto.toString = function () {
	    return this.join(" ");
	};

	if (objCtr.defineProperty) {
	    var classListPropDesc = {
	          get: classListGetter
	        , enumerable: true
	        , configurable: true
	    };
	    try {
	        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	    } catch (ex) { // IE 8 doesn't support enumerable:true
	        if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        }
	    }
	} else if (objCtr[protoProp].__defineGetter__) {
	    elemCtrProto.__defineGetter__(classListProp, classListGetter);
	}

	}(self));

	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== "function") {
	            // closest thing possible to the ECMAScript 5 internal IsCallable function
	            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	        }

	        var aArgs = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP = function () {},
	        fBound = function () {
	            return fToBind.apply(this instanceof fNOP && oThis
	                ? this
	                : oThis,
	                aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();

	        return fBound;
	    };
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// adds requestAnimationFrame functionality
	// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/

	window.requestAnimationFrame || (window.requestAnimationFrame =
	  window.webkitRequestAnimationFrame ||
	  window.mozRequestAnimationFrame    ||
	  window.oRequestAnimationFrame      ||
	  window.msRequestAnimationFrame     ||
	  function(callback, element) {
	    return window.setTimeout(function() {
	      callback(+new Date());
	  }, 1000 / 60);
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*! Socket.IO.js build:0.9.10, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

	var io = (false ? {} : module.exports);
	(function() {

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, global) {

	  /**
	   * IO namespace.
	   *
	   * @namespace
	   */

	  var io = exports;

	  /**
	   * Socket.IO version
	   *
	   * @api public
	   */

	  io.version = '0.9.10';

	  /**
	   * Protocol implemented.
	   *
	   * @api public
	   */

	  io.protocol = 1;

	  /**
	   * Available transports, these will be populated with the available transports
	   *
	   * @api public
	   */

	  io.transports = [];

	  /**
	   * Keep track of jsonp callbacks.
	   *
	   * @api private
	   */

	  io.j = [];

	  /**
	   * Keep track of our io.Sockets
	   *
	   * @api private
	   */
	  io.sockets = {};


	  /**
	   * Manages connections to hosts.
	   *
	   * @param {String} uri
	   * @Param {Boolean} force creation of new socket (defaults to false)
	   * @api public
	   */

	  io.connect = function (host, details) {
	    var uri = io.util.parseUri(host)
	      , uuri
	      , socket;

	    if (global && global.location) {
	      uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
	      uri.host = uri.host || (global.document
	        ? global.document.domain : global.location.hostname);
	      uri.port = uri.port || global.location.port;
	    }

	    uuri = io.util.uniqueUri(uri);

	    var options = {
	        host: uri.host
	      , secure: 'https' == uri.protocol
	      , port: uri.port || ('https' == uri.protocol ? 443 : 80)
	      , query: uri.query || ''
	    };

	    io.util.merge(options, details);

	    if (options['force new connection'] || !io.sockets[uuri]) {
	      socket = new io.Socket(options);
	    }

	    if (!options['force new connection'] && socket) {
	      io.sockets[uuri] = socket;
	    }

	    socket = socket || io.sockets[uuri];

	    // if path is different from '' or /
	    return socket.of(uri.path.length > 1 ? uri.path : '');
	  };

	})('object' === typeof module ? module.exports : (this.io = {}), this);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, global) {

	  /**
	   * Utilities namespace.
	   *
	   * @namespace
	   */

	  var util = exports.util = {};

	  /**
	   * Parses an URI
	   *
	   * @author Steven Levithan <stevenlevithan.com> (MIT license)
	   * @api public
	   */

	  var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
	               'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
	               'anchor'];

	  util.parseUri = function (str) {
	    var m = re.exec(str || '')
	      , uri = {}
	      , i = 14;

	    while (i--) {
	      uri[parts[i]] = m[i] || '';
	    }

	    return uri;
	  };

	  /**
	   * Produces a unique url that identifies a Socket.IO connection.
	   *
	   * @param {Object} uri
	   * @api public
	   */

	  util.uniqueUri = function (uri) {
	    var protocol = uri.protocol
	      , host = uri.host
	      , port = uri.port;

	    if ('document' in global) {
	      host = host || document.domain;
	      port = port || (protocol == 'https'
	        && document.location.protocol !== 'https:' ? 443 : document.location.port);
	    } else {
	      host = host || 'localhost';

	      if (!port && protocol == 'https') {
	        port = 443;
	      }
	    }

	    return (protocol || 'http') + '://' + host + ':' + (port || 80);
	  };

	  /**
	   * Mergest 2 query strings in to once unique query string
	   *
	   * @param {String} base
	   * @param {String} addition
	   * @api public
	   */

	  util.query = function (base, addition) {
	    var query = util.chunkQuery(base || '')
	      , components = [];

	    util.merge(query, util.chunkQuery(addition || ''));
	    for (var part in query) {
	      if (query.hasOwnProperty(part)) {
	        components.push(part + '=' + query[part]);
	      }
	    }

	    return components.length ? '?' + components.join('&') : '';
	  };

	  /**
	   * Transforms a querystring in to an object
	   *
	   * @param {String} qs
	   * @api public
	   */

	  util.chunkQuery = function (qs) {
	    var query = {}
	      , params = qs.split('&')
	      , i = 0
	      , l = params.length
	      , kv;

	    for (; i < l; ++i) {
	      kv = params[i].split('=');
	      if (kv[0]) {
	        query[kv[0]] = kv[1];
	      }
	    }

	    return query;
	  };

	  /**
	   * Executes the given function when the page is loaded.
	   *
	   *     io.util.load(function () { console.log('page loaded'); });
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  var pageLoaded = false;

	  util.load = function (fn) {
	    if ('document' in global && document.readyState === 'complete' || pageLoaded) {
	      return fn();
	    }

	    util.on(global, 'load', fn, false);
	  };

	  /**
	   * Adds an event.
	   *
	   * @api private
	   */

	  util.on = function (element, event, fn, capture) {
	    if (element.attachEvent) {
	      element.attachEvent('on' + event, fn);
	    } else if (element.addEventListener) {
	      element.addEventListener(event, fn, capture);
	    }
	  };

	  /**
	   * Generates the correct `XMLHttpRequest` for regular and cross domain requests.
	   *
	   * @param {Boolean} [xdomain] Create a request that can be used cross domain.
	   * @returns {XMLHttpRequest|false} If we can create a XMLHttpRequest.
	   * @api private
	   */

	  util.request = function (xdomain) {

	    if (xdomain && 'undefined' != typeof XDomainRequest) {
	      return new XDomainRequest();
	    }

	    if ('undefined' != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
	      return new XMLHttpRequest();
	    }

	    if (!xdomain) {
	      try {
	        return new window[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
	      } catch(e) { }
	    }

	    return null;
	  };

	  /**
	   * XHR based transport constructor.
	   *
	   * @constructor
	   * @api public
	   */

	  /**
	   * Change the internal pageLoaded value.
	   */

	  if ('undefined' != typeof window) {
	    util.load(function () {
	      pageLoaded = true;
	    });
	  }

	  /**
	   * Defers a function to ensure a spinner is not displayed by the browser
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  util.defer = function (fn) {
	    if (!util.ua.webkit || 'undefined' != typeof importScripts) {
	      return fn();
	    }

	    util.load(function () {
	      setTimeout(fn, 100);
	    });
	  };

	  /**
	   * Merges two objects.
	   *
	   * @api public
	   */
	  
	  util.merge = function merge (target, additional, deep, lastseen) {
	    var seen = lastseen || []
	      , depth = typeof deep == 'undefined' ? 2 : deep
	      , prop;

	    for (prop in additional) {
	      if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
	        if (typeof target[prop] !== 'object' || !depth) {
	          target[prop] = additional[prop];
	          seen.push(additional[prop]);
	        } else {
	          util.merge(target[prop], additional[prop], depth - 1, seen);
	        }
	      }
	    }

	    return target;
	  };

	  /**
	   * Merges prototypes from objects
	   *
	   * @api public
	   */
	  
	  util.mixin = function (ctor, ctor2) {
	    util.merge(ctor.prototype, ctor2.prototype);
	  };

	  /**
	   * Shortcut for prototypical and static inheritance.
	   *
	   * @api private
	   */

	  util.inherit = function (ctor, ctor2) {
	    function f() {};
	    f.prototype = ctor2.prototype;
	    ctor.prototype = new f;
	  };

	  /**
	   * Checks if the given object is an Array.
	   *
	   *     io.util.isArray([]); // true
	   *     io.util.isArray({}); // false
	   *
	   * @param Object obj
	   * @api public
	   */

	  util.isArray = Array.isArray || function (obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	  };

	  /**
	   * Intersects values of two arrays into a third
	   *
	   * @api public
	   */

	  util.intersect = function (arr, arr2) {
	    var ret = []
	      , longest = arr.length > arr2.length ? arr : arr2
	      , shortest = arr.length > arr2.length ? arr2 : arr;

	    for (var i = 0, l = shortest.length; i < l; i++) {
	      if (~util.indexOf(longest, shortest[i]))
	        ret.push(shortest[i]);
	    }

	    return ret;
	  }

	  /**
	   * Array indexOf compatibility.
	   *
	   * @see bit.ly/a5Dxa2
	   * @api public
	   */

	  util.indexOf = function (arr, o, i) {
	    
	    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0; 
	         i < j && arr[i] !== o; i++) {}

	    return j <= i ? -1 : i;
	  };

	  /**
	   * Converts enumerables to array.
	   *
	   * @api public
	   */

	  util.toArray = function (enu) {
	    var arr = [];

	    for (var i = 0, l = enu.length; i < l; i++)
	      arr.push(enu[i]);

	    return arr;
	  };

	  /**
	   * UA / engines detection namespace.
	   *
	   * @namespace
	   */

	  util.ua = {};

	  /**
	   * Whether the UA supports CORS for XHR.
	   *
	   * @api public
	   */

	  util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && (function () {
	    try {
	      var a = new XMLHttpRequest();
	    } catch (e) {
	      return false;
	    }

	    return a.withCredentials != undefined;
	  })();

	  /**
	   * Detect webkit.
	   *
	   * @api public
	   */

	  util.ua.webkit = 'undefined' != typeof navigator
	    && /webkit/i.test(navigator.userAgent);

	   /**
	   * Detect iPad/iPhone/iPod.
	   *
	   * @api public
	   */

	  util.ua.iDevice = 'undefined' != typeof navigator
	      && /iPad|iPhone|iPod/i.test(navigator.userAgent);

	})('undefined' != typeof io ? io : module.exports, this);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.EventEmitter = EventEmitter;

	  /**
	   * Event emitter constructor.
	   *
	   * @api public.
	   */

	  function EventEmitter () {};

	  /**
	   * Adds a listener
	   *
	   * @api public
	   */

	  EventEmitter.prototype.on = function (name, fn) {
	    if (!this.$events) {
	      this.$events = {};
	    }

	    if (!this.$events[name]) {
	      this.$events[name] = fn;
	    } else if (io.util.isArray(this.$events[name])) {
	      this.$events[name].push(fn);
	    } else {
	      this.$events[name] = [this.$events[name], fn];
	    }

	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  /**
	   * Adds a volatile listener.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.once = function (name, fn) {
	    var self = this;

	    function on () {
	      self.removeListener(name, on);
	      fn.apply(this, arguments);
	    };

	    on.listener = fn;
	    this.on(name, on);

	    return this;
	  };

	  /**
	   * Removes a listener.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.removeListener = function (name, fn) {
	    if (this.$events && this.$events[name]) {
	      var list = this.$events[name];

	      if (io.util.isArray(list)) {
	        var pos = -1;

	        for (var i = 0, l = list.length; i < l; i++) {
	          if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
	            pos = i;
	            break;
	          }
	        }

	        if (pos < 0) {
	          return this;
	        }

	        list.splice(pos, 1);

	        if (!list.length) {
	          delete this.$events[name];
	        }
	      } else if (list === fn || (list.listener && list.listener === fn)) {
	        delete this.$events[name];
	      }
	    }

	    return this;
	  };

	  /**
	   * Removes all listeners for an event.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.removeAllListeners = function (name) {
	    if (name === undefined) {
	      this.$events = {};
	      return this;
	    }

	    if (this.$events && this.$events[name]) {
	      this.$events[name] = null;
	    }

	    return this;
	  };

	  /**
	   * Gets all listeners for a certain event.
	   *
	   * @api publci
	   */

	  EventEmitter.prototype.listeners = function (name) {
	    if (!this.$events) {
	      this.$events = {};
	    }

	    if (!this.$events[name]) {
	      this.$events[name] = [];
	    }

	    if (!io.util.isArray(this.$events[name])) {
	      this.$events[name] = [this.$events[name]];
	    }

	    return this.$events[name];
	  };

	  /**
	   * Emits an event.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.emit = function (name) {
	    if (!this.$events) {
	      return false;
	    }

	    var handler = this.$events[name];

	    if (!handler) {
	      return false;
	    }

	    var args = Array.prototype.slice.call(arguments, 1);

	    if ('function' == typeof handler) {
	      handler.apply(this, args);
	    } else if (io.util.isArray(handler)) {
	      var listeners = handler.slice();

	      for (var i = 0, l = listeners.length; i < l; i++) {
	        listeners[i].apply(this, args);
	      }
	    } else {
	      return false;
	    }

	    return true;
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	/**
	 * Based on JSON2 (http://www.JSON.org/js.html).
	 */

	(function (exports, nativeJSON) {
	  "use strict";

	  // use native JSON if it's available
	  if (nativeJSON && nativeJSON.parse){
	    return exports.JSON = {
	      parse: nativeJSON.parse
	    , stringify: nativeJSON.stringify
	    }
	  }

	  var JSON = exports.JSON = {};

	  function f(n) {
	      // Format integers to have at least two digits.
	      return n < 10 ? '0' + n : n;
	  }

	  function date(d, key) {
	    return isFinite(d.valueOf()) ?
	        d.getUTCFullYear()     + '-' +
	        f(d.getUTCMonth() + 1) + '-' +
	        f(d.getUTCDate())      + 'T' +
	        f(d.getUTCHours())     + ':' +
	        f(d.getUTCMinutes())   + ':' +
	        f(d.getUTCSeconds())   + 'Z' : null;
	  };

	  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      gap,
	      indent,
	      meta = {    // table of character substitutions
	          '\b': '\\b',
	          '\t': '\\t',
	          '\n': '\\n',
	          '\f': '\\f',
	          '\r': '\\r',
	          '"' : '\\"',
	          '\\': '\\\\'
	      },
	      rep;


	  function quote(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.

	      escapable.lastIndex = 0;
	      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	          var c = meta[a];
	          return typeof c === 'string' ? c :
	              '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	      }) + '"' : '"' + string + '"';
	  }


	  function str(key, holder) {

	// Produce a string from holder[key].

	      var i,          // The loop counter.
	          k,          // The member key.
	          v,          // The member value.
	          length,
	          mind = gap,
	          partial,
	          value = holder[key];

	// If the value has a toJSON method, call it to obtain a replacement value.

	      if (value instanceof Date) {
	          value = date(key);
	      }

	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.

	      if (typeof rep === 'function') {
	          value = rep.call(holder, key, value);
	      }

	// What happens next depends on the value's type.

	      switch (typeof value) {
	      case 'string':
	          return quote(value);

	      case 'number':

	// JSON numbers must be finite. Encode non-finite numbers as null.

	          return isFinite(value) ? String(value) : 'null';

	      case 'boolean':
	      case 'null':

	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.

	          return String(value);

	// If the type is 'object', we might be dealing with an object or an array or
	// null.

	      case 'object':

	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.

	          if (!value) {
	              return 'null';
	          }

	// Make an array to hold the partial results of stringifying this object value.

	          gap += indent;
	          partial = [];

	// Is the value an array?

	          if (Object.prototype.toString.apply(value) === '[object Array]') {

	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.

	              length = value.length;
	              for (i = 0; i < length; i += 1) {
	                  partial[i] = str(i, value) || 'null';
	              }

	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.

	              v = partial.length === 0 ? '[]' : gap ?
	                  '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
	                  '[' + partial.join(',') + ']';
	              gap = mind;
	              return v;
	          }

	// If the replacer is an array, use it to select the members to be stringified.

	          if (rep && typeof rep === 'object') {
	              length = rep.length;
	              for (i = 0; i < length; i += 1) {
	                  if (typeof rep[i] === 'string') {
	                      k = rep[i];
	                      v = str(k, value);
	                      if (v) {
	                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                      }
	                  }
	              }
	          } else {

	// Otherwise, iterate through all of the keys in the object.

	              for (k in value) {
	                  if (Object.prototype.hasOwnProperty.call(value, k)) {
	                      v = str(k, value);
	                      if (v) {
	                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                      }
	                  }
	              }
	          }

	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.

	          v = partial.length === 0 ? '{}' : gap ?
	              '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
	              '{' + partial.join(',') + '}';
	          gap = mind;
	          return v;
	      }
	  }

	// If the JSON object does not yet have a stringify method, give it one.

	  JSON.stringify = function (value, replacer, space) {

	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.

	      var i;
	      gap = '';
	      indent = '';

	// If the space parameter is a number, make an indent string containing that
	// many spaces.

	      if (typeof space === 'number') {
	          for (i = 0; i < space; i += 1) {
	              indent += ' ';
	          }

	// If the space parameter is a string, it will be used as the indent string.

	      } else if (typeof space === 'string') {
	          indent = space;
	      }

	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.

	      rep = replacer;
	      if (replacer && typeof replacer !== 'function' &&
	              (typeof replacer !== 'object' ||
	              typeof replacer.length !== 'number')) {
	          throw new Error('JSON.stringify');
	      }

	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.

	      return str('', {'': value});
	  };

	// If the JSON object does not yet have a parse method, give it one.

	  JSON.parse = function (text, reviver) {
	  // The parse method takes a text and an optional reviver function, and returns
	  // a JavaScript value if the text is a valid JSON text.

	      var j;

	      function walk(holder, key) {

	  // The walk method is used to recursively walk the resulting structure so
	  // that modifications can be made.

	          var k, v, value = holder[key];
	          if (value && typeof value === 'object') {
	              for (k in value) {
	                  if (Object.prototype.hasOwnProperty.call(value, k)) {
	                      v = walk(value, k);
	                      if (v !== undefined) {
	                          value[k] = v;
	                      } else {
	                          delete value[k];
	                      }
	                  }
	              }
	          }
	          return reviver.call(holder, key, value);
	      }


	  // Parsing happens in four stages. In the first stage, we replace certain
	  // Unicode characters with escape sequences. JavaScript handles many characters
	  // incorrectly, either silently deleting them, or treating them as line endings.

	      text = String(text);
	      cx.lastIndex = 0;
	      if (cx.test(text)) {
	          text = text.replace(cx, function (a) {
	              return '\\u' +
	                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	          });
	      }

	  // In the second stage, we run the text against regular expressions that look
	  // for non-JSON patterns. We are especially concerned with '()' and 'new'
	  // because they can cause invocation, and '=' because it can cause mutation.
	  // But just to be safe, we want to reject all unexpected forms.

	  // We split the second stage into 4 regexp operations in order to work around
	  // crippling inefficiencies in IE's and Safari's regexp engines. First we
	  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
	  // replace all simple value tokens with ']' characters. Third, we delete all
	  // open brackets that follow a colon or comma or that begin the text. Finally,
	  // we look to see that the remaining characters are only whitespace or ']' or
	  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

	      if (/^[\],:{}\s]*$/
	              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

	  // In the third stage we use the eval function to compile the text into a
	  // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
	  // in JavaScript: it can begin a block or an object literal. We wrap the text
	  // in parens to eliminate the ambiguity.

	          j = eval('(' + text + ')');

	  // In the optional fourth stage, we recursively walk the new structure, passing
	  // each name/value pair to a reviver function for possible transformation.

	          return typeof reviver === 'function' ?
	              walk({'': j}, '') : j;
	      }

	  // If the text is not JSON parseable, then a SyntaxError is thrown.

	      throw new SyntaxError('JSON.parse');
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , typeof JSON !== 'undefined' ? JSON : undefined
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Parser namespace.
	   *
	   * @namespace
	   */

	  var parser = exports.parser = {};

	  /**
	   * Packet types.
	   */

	  var packets = parser.packets = [
	      'disconnect'
	    , 'connect'
	    , 'heartbeat'
	    , 'message'
	    , 'json'
	    , 'event'
	    , 'ack'
	    , 'error'
	    , 'noop'
	  ];

	  /**
	   * Errors reasons.
	   */

	  var reasons = parser.reasons = [
	      'transport not supported'
	    , 'client not handshaken'
	    , 'unauthorized'
	  ];

	  /**
	   * Errors advice.
	   */

	  var advice = parser.advice = [
	      'reconnect'
	  ];

	  /**
	   * Shortcuts.
	   */

	  var JSON = io.JSON
	    , indexOf = io.util.indexOf;

	  /**
	   * Encodes a packet.
	   *
	   * @api private
	   */

	  parser.encodePacket = function (packet) {
	    var type = indexOf(packets, packet.type)
	      , id = packet.id || ''
	      , endpoint = packet.endpoint || ''
	      , ack = packet.ack
	      , data = null;

	    switch (packet.type) {
	      case 'error':
	        var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
	          , adv = packet.advice ? indexOf(advice, packet.advice) : '';

	        if (reason !== '' || adv !== '')
	          data = reason + (adv !== '' ? ('+' + adv) : '');

	        break;

	      case 'message':
	        if (packet.data !== '')
	          data = packet.data;
	        break;

	      case 'event':
	        var ev = { name: packet.name };

	        if (packet.args && packet.args.length) {
	          ev.args = packet.args;
	        }

	        data = JSON.stringify(ev);
	        break;

	      case 'json':
	        data = JSON.stringify(packet.data);
	        break;

	      case 'connect':
	        if (packet.qs)
	          data = packet.qs;
	        break;

	      case 'ack':
	        data = packet.ackId
	          + (packet.args && packet.args.length
	              ? '+' + JSON.stringify(packet.args) : '');
	        break;
	    }

	    // construct packet with required fragments
	    var encoded = [
	        type
	      , id + (ack == 'data' ? '+' : '')
	      , endpoint
	    ];

	    // data fragment is optional
	    if (data !== null && data !== undefined)
	      encoded.push(data);

	    return encoded.join(':');
	  };

	  /**
	   * Encodes multiple messages (payload).
	   *
	   * @param {Array} messages
	   * @api private
	   */

	  parser.encodePayload = function (packets) {
	    var decoded = '';

	    if (packets.length == 1)
	      return packets[0];

	    for (var i = 0, l = packets.length; i < l; i++) {
	      var packet = packets[i];
	      decoded += '\ufffd' + packet.length + '\ufffd' + packets[i];
	    }

	    return decoded;
	  };

	  /**
	   * Decodes a packet
	   *
	   * @api private
	   */

	  var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

	  parser.decodePacket = function (data) {
	    var pieces = data.match(regexp);

	    if (!pieces) return {};

	    var id = pieces[2] || ''
	      , data = pieces[5] || ''
	      , packet = {
	            type: packets[pieces[1]]
	          , endpoint: pieces[4] || ''
	        };

	    // whether we need to acknowledge the packet
	    if (id) {
	      packet.id = id;
	      if (pieces[3])
	        packet.ack = 'data';
	      else
	        packet.ack = true;
	    }

	    // handle different packet types
	    switch (packet.type) {
	      case 'error':
	        var pieces = data.split('+');
	        packet.reason = reasons[pieces[0]] || '';
	        packet.advice = advice[pieces[1]] || '';
	        break;

	      case 'message':
	        packet.data = data || '';
	        break;

	      case 'event':
	        try {
	          var opts = JSON.parse(data);
	          packet.name = opts.name;
	          packet.args = opts.args;
	        } catch (e) { }

	        packet.args = packet.args || [];
	        break;

	      case 'json':
	        try {
	          packet.data = JSON.parse(data);
	        } catch (e) { }
	        break;

	      case 'connect':
	        packet.qs = data || '';
	        break;

	      case 'ack':
	        var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
	        if (pieces) {
	          packet.ackId = pieces[1];
	          packet.args = [];

	          if (pieces[3]) {
	            try {
	              packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
	            } catch (e) { }
	          }
	        }
	        break;

	      case 'disconnect':
	      case 'heartbeat':
	        break;
	    };

	    return packet;
	  };

	  /**
	   * Decodes data payload. Detects multiple messages
	   *
	   * @return {Array} messages
	   * @api public
	   */

	  parser.decodePayload = function (data) {
	    // IE doesn't like data[i] for unicode chars, charAt works fine
	    if (data.charAt(0) == '\ufffd') {
	      var ret = [];

	      for (var i = 1, length = ''; i < data.length; i++) {
	        if (data.charAt(i) == '\ufffd') {
	          ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
	          i += Number(length) + 1;
	          length = '';
	        } else {
	          length += data.charAt(i);
	        }
	      }

	      return ret;
	    } else {
	      return [parser.decodePacket(data)];
	    }
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.Transport = Transport;

	  /**
	   * This is the transport template for all supported transport methods.
	   *
	   * @constructor
	   * @api public
	   */

	  function Transport (socket, sessid) {
	    this.socket = socket;
	    this.sessid = sessid;
	  };

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(Transport, io.EventEmitter);


	  /**
	   * Indicates whether heartbeats is enabled for this transport
	   *
	   * @api private
	   */

	  Transport.prototype.heartbeats = function () {
	    return true;
	  }

	  /**
	   * Handles the response from the server. When a new response is received
	   * it will automatically update the timeout, decode the message and
	   * forwards the response to the onMessage function for further processing.
	   *
	   * @param {String} data Response from the server.
	   * @api private
	   */

	  Transport.prototype.onData = function (data) {
	    this.clearCloseTimeout();
	    
	    // If the connection in currently open (or in a reopening state) reset the close 
	    // timeout since we have just received data. This check is necessary so
	    // that we don't reset the timeout on an explicitly disconnected connection.
	    if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
	      this.setCloseTimeout();
	    }

	    if (data !== '') {
	      // todo: we should only do decodePayload for xhr transports
	      var msgs = io.parser.decodePayload(data);

	      if (msgs && msgs.length) {
	        for (var i = 0, l = msgs.length; i < l; i++) {
	          this.onPacket(msgs[i]);
	        }
	      }
	    }

	    return this;
	  };

	  /**
	   * Handles packets.
	   *
	   * @api private
	   */

	  Transport.prototype.onPacket = function (packet) {
	    this.socket.setHeartbeatTimeout();

	    if (packet.type == 'heartbeat') {
	      return this.onHeartbeat();
	    }

	    if (packet.type == 'connect' && packet.endpoint == '') {
	      this.onConnect();
	    }

	    if (packet.type == 'error' && packet.advice == 'reconnect') {
	      this.isOpen = false;
	    }

	    this.socket.onPacket(packet);

	    return this;
	  };

	  /**
	   * Sets close timeout
	   *
	   * @api private
	   */
	  
	  Transport.prototype.setCloseTimeout = function () {
	    if (!this.closeTimeout) {
	      var self = this;

	      this.closeTimeout = setTimeout(function () {
	        self.onDisconnect();
	      }, this.socket.closeTimeout);
	    }
	  };

	  /**
	   * Called when transport disconnects.
	   *
	   * @api private
	   */

	  Transport.prototype.onDisconnect = function () {
	    if (this.isOpen) this.close();
	    this.clearTimeouts();
	    this.socket.onDisconnect();
	    return this;
	  };

	  /**
	   * Called when transport connects
	   *
	   * @api private
	   */

	  Transport.prototype.onConnect = function () {
	    this.socket.onConnect();
	    return this;
	  }

	  /**
	   * Clears close timeout
	   *
	   * @api private
	   */

	  Transport.prototype.clearCloseTimeout = function () {
	    if (this.closeTimeout) {
	      clearTimeout(this.closeTimeout);
	      this.closeTimeout = null;
	    }
	  };

	  /**
	   * Clear timeouts
	   *
	   * @api private
	   */

	  Transport.prototype.clearTimeouts = function () {
	    this.clearCloseTimeout();

	    if (this.reopenTimeout) {
	      clearTimeout(this.reopenTimeout);
	    }
	  };

	  /**
	   * Sends a packet
	   *
	   * @param {Object} packet object.
	   * @api private
	   */

	  Transport.prototype.packet = function (packet) {
	    this.send(io.parser.encodePacket(packet));
	  };

	  /**
	   * Send the received heartbeat message back to server. So the server
	   * knows we are still connected.
	   *
	   * @param {String} heartbeat Heartbeat response from the server.
	   * @api private
	   */

	  Transport.prototype.onHeartbeat = function (heartbeat) {
	    this.packet({ type: 'heartbeat' });
	  };
	 
	  /**
	   * Called when the transport opens.
	   *
	   * @api private
	   */

	  Transport.prototype.onOpen = function () {
	    this.isOpen = true;
	    this.clearCloseTimeout();
	    this.socket.onOpen();
	  };

	  /**
	   * Notifies the base when the connection with the Socket.IO server
	   * has been disconnected.
	   *
	   * @api private
	   */

	  Transport.prototype.onClose = function () {
	    var self = this;

	    /* FIXME: reopen delay causing a infinit loop
	    this.reopenTimeout = setTimeout(function () {
	      self.open();
	    }, this.socket.options['reopen delay']);*/

	    this.isOpen = false;
	    this.socket.onClose();
	    this.onDisconnect();
	  };

	  /**
	   * Generates a connection url based on the Socket.IO URL Protocol.
	   * See <https://github.com/learnboost/socket.io-node/> for more details.
	   *
	   * @returns {String} Connection url
	   * @api private
	   */

	  Transport.prototype.prepareUrl = function () {
	    var options = this.socket.options;

	    return this.scheme() + '://'
	      + options.host + ':' + options.port + '/'
	      + options.resource + '/' + io.protocol
	      + '/' + this.name + '/' + this.sessid;
	  };

	  /**
	   * Checks if the transport is ready to start a connection.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  Transport.prototype.ready = function (socket, fn) {
	    fn.call(this);
	  };
	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports.Socket = Socket;

	  /**
	   * Create a new `Socket.IO client` which can establish a persistent
	   * connection with a Socket.IO enabled server.
	   *
	   * @api public
	   */

	  function Socket (options) {
	    this.options = {
	        port: 80
	      , secure: false
	      , document: 'document' in global ? document : false
	      , resource: 'socket.io'
	      , transports: io.transports
	      , 'connect timeout': 10000
	      , 'try multiple transports': true
	      , 'reconnect': true
	      , 'reconnection delay': 500
	      , 'reconnection limit': Infinity
	      , 'reopen delay': 3000
	      , 'max reconnection attempts': 10
	      , 'sync disconnect on unload': false
	      , 'auto connect': true
	      , 'flash policy port': 10843
	      , 'manualFlush': false
	    };

	    io.util.merge(this.options, options);

	    this.connected = false;
	    this.open = false;
	    this.connecting = false;
	    this.reconnecting = false;
	    this.namespaces = {};
	    this.buffer = [];
	    this.doBuffer = false;

	    if (this.options['sync disconnect on unload'] &&
	        (!this.isXDomain() || io.util.ua.hasCORS)) {
	      var self = this;
	      io.util.on(global, 'beforeunload', function () {
	        self.disconnectSync();
	      }, false);
	    }

	    if (this.options['auto connect']) {
	      this.connect();
	    }
	};

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(Socket, io.EventEmitter);

	  /**
	   * Returns a namespace listener/emitter for this socket
	   *
	   * @api public
	   */

	  Socket.prototype.of = function (name) {
	    if (!this.namespaces[name]) {
	      this.namespaces[name] = new io.SocketNamespace(this, name);

	      if (name !== '') {
	        this.namespaces[name].packet({ type: 'connect' });
	      }
	    }

	    return this.namespaces[name];
	  };

	  /**
	   * Emits the given event to the Socket and all namespaces
	   *
	   * @api private
	   */

	  Socket.prototype.publish = function () {
	    this.emit.apply(this, arguments);

	    var nsp;

	    for (var i in this.namespaces) {
	      if (this.namespaces.hasOwnProperty(i)) {
	        nsp = this.of(i);
	        nsp.$emit.apply(nsp, arguments);
	      }
	    }
	  };

	  /**
	   * Performs the handshake
	   *
	   * @api private
	   */

	  function empty () { };

	  Socket.prototype.handshake = function (fn) {
	    var self = this
	      , options = this.options;

	    function complete (data) {
	      if (data instanceof Error) {
	        self.connecting = false;
	        self.onError(data.message);
	      } else {
	        fn.apply(null, data.split(':'));
	      }
	    };

	    var url = [
	          'http' + (options.secure ? 's' : '') + ':/'
	        , options.host + ':' + options.port
	        , options.resource
	        , io.protocol
	        , io.util.query(this.options.query, 't=' + +new Date)
	      ].join('/');

	    if (this.isXDomain() && !io.util.ua.hasCORS) {
	      var insertAt = document.getElementsByTagName('script')[0]
	        , script = document.createElement('script');

	      script.src = url + '&jsonp=' + io.j.length;
	      insertAt.parentNode.insertBefore(script, insertAt);

	      io.j.push(function (data) {
	        complete(data);
	        script.parentNode.removeChild(script);
	      });
	    } else {
	      var xhr = io.util.request();

	      xhr.open('GET', url, true);
	      if (this.isXDomain()) {
	        xhr.withCredentials = true;
	      }
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	          xhr.onreadystatechange = empty;

	          if (xhr.status == 200) {
	            complete(xhr.responseText);
	          } else if (xhr.status == 403) {
	            self.onError(xhr.responseText);
	          } else {
	            self.connecting = false;            
	            !self.reconnecting && self.onError(xhr.responseText);
	          }
	        }
	      };
	      xhr.send(null);
	    }
	  };

	  /**
	   * Find an available transport based on the options supplied in the constructor.
	   *
	   * @api private
	   */

	  Socket.prototype.getTransport = function (override) {
	    var transports = override || this.transports, match;

	    for (var i = 0, transport; transport = transports[i]; i++) {
	      if (io.Transport[transport]
	        && io.Transport[transport].check(this)
	        && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
	        return new io.Transport[transport](this, this.sessionid);
	      }
	    }

	    return null;
	  };

	  /**
	   * Connects to the server.
	   *
	   * @param {Function} [fn] Callback.
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.connect = function (fn) {
	    if (this.connecting) {
	      return this;
	    }

	    var self = this;
	    self.connecting = true;
	    
	    this.handshake(function (sid, heartbeat, close, transports) {
	      self.sessionid = sid;
	      self.closeTimeout = close * 1000;
	      self.heartbeatTimeout = heartbeat * 1000;
	      if(!self.transports)
	          self.transports = self.origTransports = (transports ? io.util.intersect(
	              transports.split(',')
	            , self.options.transports
	          ) : self.options.transports);

	      self.setHeartbeatTimeout();

	      function connect (transports){
	        if (self.transport) self.transport.clearTimeouts();

	        self.transport = self.getTransport(transports);
	        if (!self.transport) return self.publish('connect_failed');

	        // once the transport is ready
	        self.transport.ready(self, function () {
	          self.connecting = true;
	          self.publish('connecting', self.transport.name);
	          self.transport.open();

	          if (self.options['connect timeout']) {
	            self.connectTimeoutTimer = setTimeout(function () {
	              if (!self.connected) {
	                self.connecting = false;

	                if (self.options['try multiple transports']) {
	                  var remaining = self.transports;

	                  while (remaining.length > 0 && remaining.splice(0,1)[0] !=
	                         self.transport.name) {}

	                    if (remaining.length){
	                      connect(remaining);
	                    } else {
	                      self.publish('connect_failed');
	                    }
	                }
	              }
	            }, self.options['connect timeout']);
	          }
	        });
	      }

	      connect(self.transports);

	      self.once('connect', function (){
	        clearTimeout(self.connectTimeoutTimer);

	        fn && typeof fn == 'function' && fn();
	      });
	    });

	    return this;
	  };

	  /**
	   * Clears and sets a new heartbeat timeout using the value given by the
	   * server during the handshake.
	   *
	   * @api private
	   */

	  Socket.prototype.setHeartbeatTimeout = function () {
	    clearTimeout(this.heartbeatTimeoutTimer);
	    if(this.transport && !this.transport.heartbeats()) return;

	    var self = this;
	    this.heartbeatTimeoutTimer = setTimeout(function () {
	      self.transport.onClose();
	    }, this.heartbeatTimeout);
	  };

	  /**
	   * Sends a message.
	   *
	   * @param {Object} data packet.
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.packet = function (data) {
	    if (this.connected && !this.doBuffer) {
	      this.transport.packet(data);
	    } else {
	      this.buffer.push(data);
	    }

	    return this;
	  };

	  /**
	   * Sets buffer state
	   *
	   * @api private
	   */

	  Socket.prototype.setBuffer = function (v) {
	    this.doBuffer = v;

	    if (!v && this.connected && this.buffer.length) {
	      if (!this.options['manualFlush']) {
	        this.flushBuffer();
	      }
	    }
	  };

	  /**
	   * Flushes the buffer data over the wire.
	   * To be invoked manually when 'manualFlush' is set to true.
	   *
	   * @api public
	   */

	  Socket.prototype.flushBuffer = function() {
	    this.transport.payload(this.buffer);
	    this.buffer = [];
	  };
	  

	  /**
	   * Disconnect the established connect.
	   *
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.disconnect = function () {
	    if (this.connected || this.connecting) {
	      if (this.open) {
	        this.of('').packet({ type: 'disconnect' });
	      }

	      // handle disconnection immediately
	      this.onDisconnect('booted');
	    }

	    return this;
	  };

	  /**
	   * Disconnects the socket with a sync XHR.
	   *
	   * @api private
	   */

	  Socket.prototype.disconnectSync = function () {
	    // ensure disconnection
	    var xhr = io.util.request();
	    var uri = [
	        'http' + (this.options.secure ? 's' : '') + ':/'
	      , this.options.host + ':' + this.options.port
	      , this.options.resource
	      , io.protocol
	      , ''
	      , this.sessionid
	    ].join('/') + '/?disconnect=1';

	    xhr.open('GET', uri, false);
	    xhr.send(null);

	    // handle disconnection immediately
	    this.onDisconnect('booted');
	  };

	  /**
	   * Check if we need to use cross domain enabled transports. Cross domain would
	   * be a different port or different domain name.
	   *
	   * @returns {Boolean}
	   * @api private
	   */

	  Socket.prototype.isXDomain = function () {

	    var port = global.location.port ||
	      ('https:' == global.location.protocol ? 443 : 80);

	    return this.options.host !== global.location.hostname 
	      || this.options.port != port;
	  };

	  /**
	   * Called upon handshake.
	   *
	   * @api private
	   */

	  Socket.prototype.onConnect = function () {
	    if (!this.connected) {
	      this.connected = true;
	      this.connecting = false;
	      if (!this.doBuffer) {
	        // make sure to flush the buffer
	        this.setBuffer(false);
	      }
	      this.emit('connect');
	    }
	  };

	  /**
	   * Called when the transport opens
	   *
	   * @api private
	   */

	  Socket.prototype.onOpen = function () {
	    this.open = true;
	  };

	  /**
	   * Called when the transport closes.
	   *
	   * @api private
	   */

	  Socket.prototype.onClose = function () {
	    this.open = false;
	    clearTimeout(this.heartbeatTimeoutTimer);
	  };

	  /**
	   * Called when the transport first opens a connection
	   *
	   * @param text
	   */

	  Socket.prototype.onPacket = function (packet) {
	    this.of(packet.endpoint).onPacket(packet);
	  };

	  /**
	   * Handles an error.
	   *
	   * @api private
	   */

	  Socket.prototype.onError = function (err) {
	    if (err && err.advice) {
	      if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
	        this.disconnect();
	        if (this.options.reconnect) {
	          this.reconnect();
	        }
	      }
	    }

	    this.publish('error', err && err.reason ? err.reason : err);
	  };

	  /**
	   * Called when the transport disconnects.
	   *
	   * @api private
	   */

	  Socket.prototype.onDisconnect = function (reason) {
	    var wasConnected = this.connected
	      , wasConnecting = this.connecting;

	    this.connected = false;
	    this.connecting = false;
	    this.open = false;

	    if (wasConnected || wasConnecting) {
	      this.transport.close();
	      this.transport.clearTimeouts();
	      if (wasConnected) {
	        this.publish('disconnect', reason);

	        if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
	          this.reconnect();
	        }
	      }
	    }
	  };

	  /**
	   * Called upon reconnection.
	   *
	   * @api private
	   */

	  Socket.prototype.reconnect = function () {
	    this.reconnecting = true;
	    this.reconnectionAttempts = 0;
	    this.reconnectionDelay = this.options['reconnection delay'];

	    var self = this
	      , maxAttempts = this.options['max reconnection attempts']
	      , tryMultiple = this.options['try multiple transports']
	      , limit = this.options['reconnection limit'];

	    function reset () {
	      if (self.connected) {
	        for (var i in self.namespaces) {
	          if (self.namespaces.hasOwnProperty(i) && '' !== i) {
	              self.namespaces[i].packet({ type: 'connect' });
	          }
	        }
	        self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
	      }

	      clearTimeout(self.reconnectionTimer);

	      self.removeListener('connect_failed', maybeReconnect);
	      self.removeListener('connect', maybeReconnect);

	      self.reconnecting = false;

	      delete self.reconnectionAttempts;
	      delete self.reconnectionDelay;
	      delete self.reconnectionTimer;
	      delete self.redoTransports;

	      self.options['try multiple transports'] = tryMultiple;
	    };

	    function maybeReconnect () {
	      if (!self.reconnecting) {
	        return;
	      }

	      if (self.connected) {
	        return reset();
	      };

	      if (self.connecting && self.reconnecting) {
	        return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
	      }

	      if (self.reconnectionAttempts++ >= maxAttempts) {
	        if (!self.redoTransports) {
	          self.on('connect_failed', maybeReconnect);
	          self.options['try multiple transports'] = true;
	          self.transports = self.origTransports;
	          self.transport = self.getTransport();
	          self.redoTransports = true;
	          self.connect();
	        } else {
	          self.publish('reconnect_failed');
	          reset();
	        }
	      } else {
	        if (self.reconnectionDelay < limit) {
	          self.reconnectionDelay *= 2; // exponential back off
	        }

	        self.connect();
	        self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
	        self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
	      }
	    };

	    this.options['try multiple transports'] = false;
	    this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

	    this.on('connect', maybeReconnect);
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.SocketNamespace = SocketNamespace;

	  /**
	   * Socket namespace constructor.
	   *
	   * @constructor
	   * @api public
	   */

	  function SocketNamespace (socket, name) {
	    this.socket = socket;
	    this.name = name || '';
	    this.flags = {};
	    this.json = new Flag(this, 'json');
	    this.ackPackets = 0;
	    this.acks = {};
	  };

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(SocketNamespace, io.EventEmitter);

	  /**
	   * Copies emit since we override it
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

	  /**
	   * Creates a new namespace, by proxying the request to the socket. This
	   * allows us to use the synax as we do on the server.
	   *
	   * @api public
	   */

	  SocketNamespace.prototype.of = function () {
	    return this.socket.of.apply(this.socket, arguments);
	  };

	  /**
	   * Sends a packet.
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.packet = function (packet) {
	    packet.endpoint = this.name;
	    this.socket.packet(packet);
	    this.flags = {};
	    return this;
	  };

	  /**
	   * Sends a message
	   *
	   * @api public
	   */

	  SocketNamespace.prototype.send = function (data, fn) {
	    var packet = {
	        type: this.flags.json ? 'json' : 'message'
	      , data: data
	    };

	    if ('function' == typeof fn) {
	      packet.id = ++this.ackPackets;
	      packet.ack = true;
	      this.acks[packet.id] = fn;
	    }

	    return this.packet(packet);
	  };

	  /**
	   * Emits an event
	   *
	   * @api public
	   */
	  
	  SocketNamespace.prototype.emit = function (name) {
	    var args = Array.prototype.slice.call(arguments, 1)
	      , lastArg = args[args.length - 1]
	      , packet = {
	            type: 'event'
	          , name: name
	        };

	    if ('function' == typeof lastArg) {
	      packet.id = ++this.ackPackets;
	      packet.ack = 'data';
	      this.acks[packet.id] = lastArg;
	      args = args.slice(0, args.length - 1);
	    }

	    packet.args = args;

	    return this.packet(packet);
	  };

	  /**
	   * Disconnects the namespace
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.disconnect = function () {
	    if (this.name === '') {
	      this.socket.disconnect();
	    } else {
	      this.packet({ type: 'disconnect' });
	      this.$emit('disconnect');
	    }

	    return this;
	  };

	  /**
	   * Handles a packet
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.onPacket = function (packet) {
	    var self = this;

	    function ack () {
	      self.packet({
	          type: 'ack'
	        , args: io.util.toArray(arguments)
	        , ackId: packet.id
	      });
	    };

	    switch (packet.type) {
	      case 'connect':
	        this.$emit('connect');
	        break;

	      case 'disconnect':
	        if (this.name === '') {
	          this.socket.onDisconnect(packet.reason || 'booted');
	        } else {
	          this.$emit('disconnect', packet.reason);
	        }
	        break;

	      case 'message':
	      case 'json':
	        var params = ['message', packet.data];

	        if (packet.ack == 'data') {
	          params.push(ack);
	        } else if (packet.ack) {
	          this.packet({ type: 'ack', ackId: packet.id });
	        }

	        this.$emit.apply(this, params);
	        break;

	      case 'event':
	        var params = [packet.name].concat(packet.args);

	        if (packet.ack == 'data')
	          params.push(ack);

	        this.$emit.apply(this, params);
	        break;

	      case 'ack':
	        if (this.acks[packet.ackId]) {
	          this.acks[packet.ackId].apply(this, packet.args);
	          delete this.acks[packet.ackId];
	        }
	        break;

	      case 'error':
	        if (packet.advice){
	          this.socket.onError(packet);
	        } else {
	          if (packet.reason == 'unauthorized') {
	            this.$emit('connect_failed', packet.reason);
	          } else {
	            this.$emit('error', packet.reason);
	          }
	        }
	        break;
	    }
	  };

	  /**
	   * Flag interface.
	   *
	   * @api private
	   */

	  function Flag (nsp, name) {
	    this.namespace = nsp;
	    this.name = name;
	  };

	  /**
	   * Send a message
	   *
	   * @api public
	   */

	  Flag.prototype.send = function () {
	    this.namespace.flags[this.name] = true;
	    this.namespace.send.apply(this.namespace, arguments);
	  };

	  /**
	   * Emit an event
	   *
	   * @api public
	   */

	  Flag.prototype.emit = function () {
	    this.namespace.flags[this.name] = true;
	    this.namespace.emit.apply(this.namespace, arguments);
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports.websocket = WS;

	  /**
	   * The WebSocket transport uses the HTML5 WebSocket API to establish an
	   * persistent connection with the Socket.IO server. This transport will also
	   * be inherited by the FlashSocket fallback as it provides a API compatible
	   * polyfill for the WebSockets.
	   *
	   * @constructor
	   * @extends {io.Transport}
	   * @api public
	   */

	  function WS (socket) {
	    io.Transport.apply(this, arguments);
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(WS, io.Transport);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  WS.prototype.name = 'websocket';

	  /**
	   * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
	   * all the appropriate listeners to handle the responses from the server.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  WS.prototype.open = function () {
	    var query = io.util.query(this.socket.options.query)
	      , self = this
	      , Socket


	    if (!Socket) {
	      Socket = global.MozWebSocket || global.WebSocket;
	    }

	    this.websocket = new Socket(this.prepareUrl() + query);

	    this.websocket.onopen = function () {
	      self.onOpen();
	      self.socket.setBuffer(false);
	    };
	    this.websocket.onmessage = function (ev) {
	      self.onData(ev.data);
	    };
	    this.websocket.onclose = function () {
	      self.onClose();
	      self.socket.setBuffer(true);
	    };
	    this.websocket.onerror = function (e) {
	      self.onError(e);
	    };

	    return this;
	  };

	  /**
	   * Send a message to the Socket.IO server. The message will automatically be
	   * encoded in the correct message format.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  // Do to a bug in the current IDevices browser, we need to wrap the send in a 
	  // setTimeout, when they resume from sleeping the browser will crash if 
	  // we don't allow the browser time to detect the socket has been closed
	  if (io.util.ua.iDevice) {
	    WS.prototype.send = function (data) {
	      var self = this;
	      setTimeout(function() {
	         self.websocket.send(data);
	      },0);
	      return this;
	    };
	  } else {
	    WS.prototype.send = function (data) {
	      this.websocket.send(data);
	      return this;
	    };
	  }

	  /**
	   * Payload
	   *
	   * @api private
	   */

	  WS.prototype.payload = function (arr) {
	    for (var i = 0, l = arr.length; i < l; i++) {
	      this.packet(arr[i]);
	    }
	    return this;
	  };

	  /**
	   * Disconnect the established `WebSocket` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  WS.prototype.close = function () {
	    this.websocket.close();
	    return this;
	  };

	  /**
	   * Handle the errors that `WebSocket` might be giving when we
	   * are attempting to connect or send messages.
	   *
	   * @param {Error} e The error.
	   * @api private
	   */

	  WS.prototype.onError = function (e) {
	    this.socket.onError(e);
	  };

	  /**
	   * Returns the appropriate scheme for the URI generation.
	   *
	   * @api private
	   */
	  WS.prototype.scheme = function () {
	    return this.socket.options.secure ? 'wss' : 'ws';
	  };

	  /**
	   * Checks if the browser has support for native `WebSockets` and that
	   * it's not the polyfill created for the FlashSocket transport.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  WS.check = function () {
	    return ('WebSocket' in global && !('__addTask' in WebSocket))
	          || 'MozWebSocket' in global;
	  };

	  /**
	   * Check if the `WebSocket` transport support cross domain communications.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  WS.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('websocket');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.flashsocket = Flashsocket;

	  /**
	   * The FlashSocket transport. This is a API wrapper for the HTML5 WebSocket
	   * specification. It uses a .swf file to communicate with the server. If you want
	   * to serve the .swf file from a other server than where the Socket.IO script is
	   * coming from you need to use the insecure version of the .swf. More information
	   * about this can be found on the github page.
	   *
	   * @constructor
	   * @extends {io.Transport.websocket}
	   * @api public
	   */

	  function Flashsocket () {
	    io.Transport.websocket.apply(this, arguments);
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(Flashsocket, io.Transport.websocket);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  Flashsocket.prototype.name = 'flashsocket';

	  /**
	   * Disconnect the established `FlashSocket` connection. This is done by adding a 
	   * new task to the FlashSocket. The rest will be handled off by the `WebSocket` 
	   * transport.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.open = function () {
	    var self = this
	      , args = arguments;

	    WebSocket.__addTask(function () {
	      io.Transport.websocket.prototype.open.apply(self, args);
	    });
	    return this;
	  };
	  
	  /**
	   * Sends a message to the Socket.IO server. This is done by adding a new
	   * task to the FlashSocket. The rest will be handled off by the `WebSocket` 
	   * transport.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.send = function () {
	    var self = this, args = arguments;
	    WebSocket.__addTask(function () {
	      io.Transport.websocket.prototype.send.apply(self, args);
	    });
	    return this;
	  };

	  /**
	   * Disconnects the established `FlashSocket` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.close = function () {
	    WebSocket.__tasks.length = 0;
	    io.Transport.websocket.prototype.close.call(this);
	    return this;
	  };

	  /**
	   * The WebSocket fall back needs to append the flash container to the body
	   * element, so we need to make sure we have access to it. Or defer the call
	   * until we are sure there is a body element.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  Flashsocket.prototype.ready = function (socket, fn) {
	    function init () {
	      var options = socket.options
	        , port = options['flash policy port']
	        , path = [
	              'http' + (options.secure ? 's' : '') + ':/'
	            , options.host + ':' + options.port
	            , options.resource
	            , 'static/flashsocket'
	            , 'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
	          ];

	      // Only start downloading the swf file when the checked that this browser
	      // actually supports it
	      if (!Flashsocket.loaded) {
	        if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
	          // Set the correct file based on the XDomain settings
	          WEB_SOCKET_SWF_LOCATION = path.join('/');
	        }

	        if (port !== 843) {
	          WebSocket.loadFlashPolicyFile('xmlsocket://' + options.host + ':' + port);
	        }

	        WebSocket.__initialize();
	        Flashsocket.loaded = true;
	      }

	      fn.call(self);
	    }

	    var self = this;
	    if (document.body) return init();

	    io.util.load(init);
	  };

	  /**
	   * Check if the FlashSocket transport is supported as it requires that the Adobe
	   * Flash Player plug-in version `10.0.0` or greater is installed. And also check if
	   * the polyfill is correctly loaded.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  Flashsocket.check = function () {
	    if (
	        typeof WebSocket == 'undefined'
	      || !('__initialize' in WebSocket) || !swfobject
	    ) return false;

	    return swfobject.getFlashPlayerVersion().major >= 10;
	  };

	  /**
	   * Check if the FlashSocket transport can be used as cross domain / cross origin 
	   * transport. Because we can't see which type (secure or insecure) of .swf is used
	   * we will just return true.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  Flashsocket.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Disable AUTO_INITIALIZATION
	   */

	  if (typeof window != 'undefined') {
	    WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
	  }

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('flashsocket');
	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
		is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	*/
	if ('undefined' != typeof window) {
	var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O[(['Active'].concat('Object').join('X'))]!=D){try{var ad=new window[(['Active'].concat('Object').join('X'))](W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?(['Active'].concat('').join('X')):"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
	}
	// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
	// License: New BSD License
	// Reference: http://dev.w3.org/html5/websockets/
	// Reference: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol

	(function() {
	  
	  if ('undefined' == typeof window || window.WebSocket) return;

	  var console = window.console;
	  if (!console || !console.log || !console.error) {
	    console = {log: function(){ }, error: function(){ }};
	  }
	  
	  if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
	    console.error("Flash Player >= 10.0.0 is required.");
	    return;
	  }
	  if (location.protocol == "file:") {
	    console.error(
	      "WARNING: web-socket-js doesn't work in file:///... URL " +
	      "unless you set Flash Security Settings properly. " +
	      "Open the page via Web server i.e. http://...");
	  }

	  /**
	   * This class represents a faux web socket.
	   * @param {string} url
	   * @param {array or string} protocols
	   * @param {string} proxyHost
	   * @param {int} proxyPort
	   * @param {string} headers
	   */
	  WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
	    var self = this;
	    self.__id = WebSocket.__nextId++;
	    WebSocket.__instances[self.__id] = self;
	    self.readyState = WebSocket.CONNECTING;
	    self.bufferedAmount = 0;
	    self.__events = {};
	    if (!protocols) {
	      protocols = [];
	    } else if (typeof protocols == "string") {
	      protocols = [protocols];
	    }
	    // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
	    // Otherwise, when onopen fires immediately, onopen is called before it is set.
	    setTimeout(function() {
	      WebSocket.__addTask(function() {
	        WebSocket.__flash.create(
	            self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
	      });
	    }, 0);
	  };

	  /**
	   * Send data to the web socket.
	   * @param {string} data  The data to send to the socket.
	   * @return {boolean}  True for success, false for failure.
	   */
	  WebSocket.prototype.send = function(data) {
	    if (this.readyState == WebSocket.CONNECTING) {
	      throw "INVALID_STATE_ERR: Web Socket connection has not been established";
	    }
	    // We use encodeURIComponent() here, because FABridge doesn't work if
	    // the argument includes some characters. We don't use escape() here
	    // because of this:
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
	    // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
	    // preserve all Unicode characters either e.g. "\uffff" in Firefox.
	    // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
	    // additional testing.
	    var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
	    if (result < 0) { // success
	      return true;
	    } else {
	      this.bufferedAmount += result;
	      return false;
	    }
	  };

	  /**
	   * Close this web socket gracefully.
	   */
	  WebSocket.prototype.close = function() {
	    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
	      return;
	    }
	    this.readyState = WebSocket.CLOSING;
	    WebSocket.__flash.close(this.__id);
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {string} type
	   * @param {function} listener
	   * @param {boolean} useCapture
	   * @return void
	   */
	  WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
	    if (!(type in this.__events)) {
	      this.__events[type] = [];
	    }
	    this.__events[type].push(listener);
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {string} type
	   * @param {function} listener
	   * @param {boolean} useCapture
	   * @return void
	   */
	  WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
	    if (!(type in this.__events)) return;
	    var events = this.__events[type];
	    for (var i = events.length - 1; i >= 0; --i) {
	      if (events[i] === listener) {
	        events.splice(i, 1);
	        break;
	      }
	    }
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {Event} event
	   * @return void
	   */
	  WebSocket.prototype.dispatchEvent = function(event) {
	    var events = this.__events[event.type] || [];
	    for (var i = 0; i < events.length; ++i) {
	      events[i](event);
	    }
	    var handler = this["on" + event.type];
	    if (handler) handler(event);
	  };

	  /**
	   * Handles an event from Flash.
	   * @param {Object} flashEvent
	   */
	  WebSocket.prototype.__handleEvent = function(flashEvent) {
	    if ("readyState" in flashEvent) {
	      this.readyState = flashEvent.readyState;
	    }
	    if ("protocol" in flashEvent) {
	      this.protocol = flashEvent.protocol;
	    }
	    
	    var jsEvent;
	    if (flashEvent.type == "open" || flashEvent.type == "error") {
	      jsEvent = this.__createSimpleEvent(flashEvent.type);
	    } else if (flashEvent.type == "close") {
	      // TODO implement jsEvent.wasClean
	      jsEvent = this.__createSimpleEvent("close");
	    } else if (flashEvent.type == "message") {
	      var data = decodeURIComponent(flashEvent.message);
	      jsEvent = this.__createMessageEvent("message", data);
	    } else {
	      throw "unknown event type: " + flashEvent.type;
	    }
	    
	    this.dispatchEvent(jsEvent);
	  };
	  
	  WebSocket.prototype.__createSimpleEvent = function(type) {
	    if (document.createEvent && window.Event) {
	      var event = document.createEvent("Event");
	      event.initEvent(type, false, false);
	      return event;
	    } else {
	      return {type: type, bubbles: false, cancelable: false};
	    }
	  };
	  
	  WebSocket.prototype.__createMessageEvent = function(type, data) {
	    if (document.createEvent && window.MessageEvent && !window.opera) {
	      var event = document.createEvent("MessageEvent");
	      event.initMessageEvent("message", false, false, data, null, null, window, null);
	      return event;
	    } else {
	      // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
	      return {type: type, data: data, bubbles: false, cancelable: false};
	    }
	  };
	  
	  /**
	   * Define the WebSocket readyState enumeration.
	   */
	  WebSocket.CONNECTING = 0;
	  WebSocket.OPEN = 1;
	  WebSocket.CLOSING = 2;
	  WebSocket.CLOSED = 3;

	  WebSocket.__flash = null;
	  WebSocket.__instances = {};
	  WebSocket.__tasks = [];
	  WebSocket.__nextId = 0;
	  
	  /**
	   * Load a new flash security policy file.
	   * @param {string} url
	   */
	  WebSocket.loadFlashPolicyFile = function(url){
	    WebSocket.__addTask(function() {
	      WebSocket.__flash.loadManualPolicyFile(url);
	    });
	  };

	  /**
	   * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
	   */
	  WebSocket.__initialize = function() {
	    if (WebSocket.__flash) return;
	    
	    if (WebSocket.__swfLocation) {
	      // For backword compatibility.
	      window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
	    }
	    if (!window.WEB_SOCKET_SWF_LOCATION) {
	      console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
	      return;
	    }
	    var container = document.createElement("div");
	    container.id = "webSocketContainer";
	    // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
	    // Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
	    // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
	    // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
	    // the best we can do as far as we know now.
	    container.style.position = "absolute";
	    if (WebSocket.__isFlashLite()) {
	      container.style.left = "0px";
	      container.style.top = "0px";
	    } else {
	      container.style.left = "-100px";
	      container.style.top = "-100px";
	    }
	    var holder = document.createElement("div");
	    holder.id = "webSocketFlash";
	    container.appendChild(holder);
	    document.body.appendChild(container);
	    // See this article for hasPriority:
	    // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
	    swfobject.embedSWF(
	      WEB_SOCKET_SWF_LOCATION,
	      "webSocketFlash",
	      "1" /* width */,
	      "1" /* height */,
	      "10.0.0" /* SWF version */,
	      null,
	      null,
	      {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
	      null,
	      function(e) {
	        if (!e.success) {
	          console.error("[WebSocket] swfobject.embedSWF failed");
	        }
	      });
	  };
	  
	  /**
	   * Called by Flash to notify JS that it's fully loaded and ready
	   * for communication.
	   */
	  WebSocket.__onFlashInitialized = function() {
	    // We need to set a timeout here to avoid round-trip calls
	    // to flash during the initialization process.
	    setTimeout(function() {
	      WebSocket.__flash = document.getElementById("webSocketFlash");
	      WebSocket.__flash.setCallerUrl(location.href);
	      WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
	      for (var i = 0; i < WebSocket.__tasks.length; ++i) {
	        WebSocket.__tasks[i]();
	      }
	      WebSocket.__tasks = [];
	    }, 0);
	  };
	  
	  /**
	   * Called by Flash to notify WebSockets events are fired.
	   */
	  WebSocket.__onFlashEvent = function() {
	    setTimeout(function() {
	      try {
	        // Gets events using receiveEvents() instead of getting it from event object
	        // of Flash event. This is to make sure to keep message order.
	        // It seems sometimes Flash events don't arrive in the same order as they are sent.
	        var events = WebSocket.__flash.receiveEvents();
	        for (var i = 0; i < events.length; ++i) {
	          WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
	        }
	      } catch (e) {
	        console.error(e);
	      }
	    }, 0);
	    return true;
	  };
	  
	  // Called by Flash.
	  WebSocket.__log = function(message) {
	    console.log(decodeURIComponent(message));
	  };
	  
	  // Called by Flash.
	  WebSocket.__error = function(message) {
	    console.error(decodeURIComponent(message));
	  };
	  
	  WebSocket.__addTask = function(task) {
	    if (WebSocket.__flash) {
	      task();
	    } else {
	      WebSocket.__tasks.push(task);
	    }
	  };
	  
	  /**
	   * Test if the browser is running flash lite.
	   * @return {boolean} True if flash lite is running, false otherwise.
	   */
	  WebSocket.__isFlashLite = function() {
	    if (!window.navigator || !window.navigator.mimeTypes) {
	      return false;
	    }
	    var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
	    if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
	      return false;
	    }
	    return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
	  };
	  
	  if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
	    if (window.addEventListener) {
	      window.addEventListener("load", function(){
	        WebSocket.__initialize();
	      }, false);
	    } else {
	      window.attachEvent("onload", function(){
	        WebSocket.__initialize();
	      });
	    }
	  }
	  
	})();

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   *
	   * @api public
	   */

	  exports.XHR = XHR;

	  /**
	   * XHR constructor
	   *
	   * @costructor
	   * @api public
	   */

	  function XHR (socket) {
	    if (!socket) return;

	    io.Transport.apply(this, arguments);
	    this.sendBuffer = [];
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(XHR, io.Transport);

	  /**
	   * Establish a connection
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.open = function () {
	    this.socket.setBuffer(false);
	    this.onOpen();
	    this.get();

	    // we need to make sure the request succeeds since we have no indication
	    // whether the request opened or not until it succeeded.
	    this.setCloseTimeout();

	    return this;
	  };

	  /**
	   * Check if we need to send data to the Socket.IO server, if we have data in our
	   * buffer we encode it and forward it to the `post` method.
	   *
	   * @api private
	   */

	  XHR.prototype.payload = function (payload) {
	    var msgs = [];

	    for (var i = 0, l = payload.length; i < l; i++) {
	      msgs.push(io.parser.encodePacket(payload[i]));
	    }

	    this.send(io.parser.encodePayload(msgs));
	  };

	  /**
	   * Send data to the Socket.IO server.
	   *
	   * @param data The message
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.send = function (data) {
	    this.post(data);
	    return this;
	  };

	  /**
	   * Posts a encoded message to the Socket.IO server.
	   *
	   * @param {String} data A encoded message.
	   * @api private
	   */

	  function empty () { };

	  XHR.prototype.post = function (data) {
	    var self = this;
	    this.socket.setBuffer(true);

	    function stateChange () {
	      if (this.readyState == 4) {
	        this.onreadystatechange = empty;
	        self.posting = false;

	        if (this.status == 200){
	          self.socket.setBuffer(false);
	        } else {
	          self.onClose();
	        }
	      }
	    }

	    function onload () {
	      this.onload = empty;
	      self.socket.setBuffer(false);
	    };

	    this.sendXHR = this.request('POST');

	    if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
	      this.sendXHR.onload = this.sendXHR.onerror = onload;
	    } else {
	      this.sendXHR.onreadystatechange = stateChange;
	    }

	    this.sendXHR.send(data);
	  };

	  /**
	   * Disconnects the established `XHR` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.close = function () {
	    this.onClose();
	    return this;
	  };

	  /**
	   * Generates a configured XHR request
	   *
	   * @param {String} url The url that needs to be requested.
	   * @param {String} method The method the request should use.
	   * @returns {XMLHttpRequest}
	   * @api private
	   */

	  XHR.prototype.request = function (method) {
	    var req = io.util.request(this.socket.isXDomain())
	      , query = io.util.query(this.socket.options.query, 't=' + +new Date);

	    req.open(method || 'GET', this.prepareUrl() + query, true);

	    if (method == 'POST') {
	      try {
	        if (req.setRequestHeader) {
	          req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        } else {
	          // XDomainRequest
	          req.contentType = 'text/plain';
	        }
	      } catch (e) {}
	    }

	    return req;
	  };

	  /**
	   * Returns the scheme to use for the transport URLs.
	   *
	   * @api private
	   */

	  XHR.prototype.scheme = function () {
	    return this.socket.options.secure ? 'https' : 'http';
	  };

	  /**
	   * Check if the XHR transports are supported
	   *
	   * @param {Boolean} xdomain Check if we support cross domain requests.
	   * @returns {Boolean}
	   * @api public
	   */

	  XHR.check = function (socket, xdomain) {
	    try {
	      var request = io.util.request(xdomain),
	          usesXDomReq = (global.XDomainRequest && request instanceof XDomainRequest),
	          socketProtocol = (socket && socket.options && socket.options.secure ? 'https:' : 'http:'),
	          isXProtocol = (socketProtocol != global.location.protocol);
	      if (request && !(usesXDomReq && isXProtocol)) {
	        return true;
	      }
	    } catch(e) {}

	    return false;
	  };

	  /**
	   * Check if the XHR transport supports cross domain requests.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  XHR.xdomainCheck = function (socket) {
	    return XHR.check(socket, true);
	  };

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.htmlfile = HTMLFile;

	  /**
	   * The HTMLFile transport creates a `forever iframe` based transport
	   * for Internet Explorer. Regular forever iframe implementations will 
	   * continuously trigger the browsers buzy indicators. If the forever iframe
	   * is created inside a `htmlfile` these indicators will not be trigged.
	   *
	   * @constructor
	   * @extends {io.Transport.XHR}
	   * @api public
	   */

	  function HTMLFile (socket) {
	    io.Transport.XHR.apply(this, arguments);
	  };

	  /**
	   * Inherits from XHR transport.
	   */

	  io.util.inherit(HTMLFile, io.Transport.XHR);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  HTMLFile.prototype.name = 'htmlfile';

	  /**
	   * Creates a new Ac...eX `htmlfile` with a forever loading iframe
	   * that can be used to listen to messages. Inside the generated
	   * `htmlfile` a reference will be made to the HTMLFile transport.
	   *
	   * @api private
	   */

	  HTMLFile.prototype.get = function () {
	    this.doc = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
	    this.doc.open();
	    this.doc.write('<html></html>');
	    this.doc.close();
	    this.doc.parentWindow.s = this;

	    var iframeC = this.doc.createElement('div');
	    iframeC.className = 'socketio';

	    this.doc.body.appendChild(iframeC);
	    this.iframe = this.doc.createElement('iframe');

	    iframeC.appendChild(this.iframe);

	    var self = this
	      , query = io.util.query(this.socket.options.query, 't='+ +new Date);

	    this.iframe.src = this.prepareUrl() + query;

	    io.util.on(window, 'unload', function () {
	      self.destroy();
	    });
	  };

	  /**
	   * The Socket.IO server will write script tags inside the forever
	   * iframe, this function will be used as callback for the incoming
	   * information.
	   *
	   * @param {String} data The message
	   * @param {document} doc Reference to the context
	   * @api private
	   */

	  HTMLFile.prototype._ = function (data, doc) {
	    this.onData(data);
	    try {
	      var script = doc.getElementsByTagName('script')[0];
	      script.parentNode.removeChild(script);
	    } catch (e) { }
	  };

	  /**
	   * Destroy the established connection, iframe and `htmlfile`.
	   * And calls the `CollectGarbage` function of Internet Explorer
	   * to release the memory.
	   *
	   * @api private
	   */

	  HTMLFile.prototype.destroy = function () {
	    if (this.iframe){
	      try {
	        this.iframe.src = 'about:blank';
	      } catch(e){}

	      this.doc = null;
	      this.iframe.parentNode.removeChild(this.iframe);
	      this.iframe = null;

	      CollectGarbage();
	    }
	  };

	  /**
	   * Disconnects the established connection.
	   *
	   * @returns {Transport} Chaining.
	   * @api public
	   */

	  HTMLFile.prototype.close = function () {
	    this.destroy();
	    return io.Transport.XHR.prototype.close.call(this);
	  };

	  /**
	   * Checks if the browser supports this transport. The browser
	   * must have an `Ac...eXObject` implementation.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  HTMLFile.check = function (socket) {
	    if (typeof window != "undefined" && (['Active'].concat('Object').join('X')) in window){
	      try {
	        var a = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
	        return a && io.Transport.XHR.check(socket);
	      } catch(e){}
	    }
	    return false;
	  };

	  /**
	   * Check if cross domain requests are supported.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  HTMLFile.xdomainCheck = function () {
	    // we can probably do handling for sub-domains, we should
	    // test that it's cross domain but a subdomain here
	    return false;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('htmlfile');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports['xhr-polling'] = XHRPolling;

	  /**
	   * The XHR-polling transport uses long polling XHR requests to create a
	   * "persistent" connection with the server.
	   *
	   * @constructor
	   * @api public
	   */

	  function XHRPolling () {
	    io.Transport.XHR.apply(this, arguments);
	  };

	  /**
	   * Inherits from XHR transport.
	   */

	  io.util.inherit(XHRPolling, io.Transport.XHR);

	  /**
	   * Merge the properties from XHR transport
	   */

	  io.util.merge(XHRPolling, io.Transport.XHR);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  XHRPolling.prototype.name = 'xhr-polling';

	  /**
	   * Indicates whether heartbeats is enabled for this transport
	   *
	   * @api private
	   */

	  XHRPolling.prototype.heartbeats = function () {
	    return false;
	  };

	  /** 
	   * Establish a connection, for iPhone and Android this will be done once the page
	   * is loaded.
	   *
	   * @returns {Transport} Chaining.
	   * @api public
	   */

	  XHRPolling.prototype.open = function () {
	    var self = this;

	    io.Transport.XHR.prototype.open.call(self);
	    return false;
	  };

	  /**
	   * Starts a XHR request to wait for incoming messages.
	   *
	   * @api private
	   */

	  function empty () {};

	  XHRPolling.prototype.get = function () {
	    if (!this.isOpen) return;

	    var self = this;

	    function stateChange () {
	      if (this.readyState == 4) {
	        this.onreadystatechange = empty;

	        if (this.status == 200) {
	          self.onData(this.responseText);
	          self.get();
	        } else {
	          self.onClose();
	        }
	      }
	    };

	    function onload () {
	      this.onload = empty;
	      this.onerror = empty;
	      self.onData(this.responseText);
	      self.get();
	    };

	    function onerror () {
	      self.onClose();
	    };

	    this.xhr = this.request();

	    if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
	      this.xhr.onload = onload;
	      this.xhr.onerror = onerror;
	    } else {
	      this.xhr.onreadystatechange = stateChange;
	    }

	    this.xhr.send(null);
	  };

	  /**
	   * Handle the unclean close behavior.
	   *
	   * @api private
	   */

	  XHRPolling.prototype.onClose = function () {
	    io.Transport.XHR.prototype.onClose.call(this);

	    if (this.xhr) {
	      this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
	      try {
	        this.xhr.abort();
	      } catch(e){}
	      this.xhr = null;
	    }
	  };

	  /**
	   * Webkit based browsers show a infinit spinner when you start a XHR request
	   * before the browsers onload event is called so we need to defer opening of
	   * the transport until the onload event is called. Wrapping the cb in our
	   * defer method solve this.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  XHRPolling.prototype.ready = function (socket, fn) {
	    var self = this;

	    io.util.defer(function () {
	      fn.call(self);
	    });
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('xhr-polling');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {
	  /**
	   * There is a way to hide the loading indicator in Firefox. If you create and
	   * remove a iframe it will stop showing the current loading indicator.
	   * Unfortunately we can't feature detect that and UA sniffing is evil.
	   *
	   * @api private
	   */

	  var indicator = global.document && "MozAppearance" in
	    global.document.documentElement.style;

	  /**
	   * Expose constructor.
	   */

	  exports['jsonp-polling'] = JSONPPolling;

	  /**
	   * The JSONP transport creates an persistent connection by dynamically
	   * inserting a script tag in the page. This script tag will receive the
	   * information of the Socket.IO server. When new information is received
	   * it creates a new script tag for the new data stream.
	   *
	   * @constructor
	   * @extends {io.Transport.xhr-polling}
	   * @api public
	   */

	  function JSONPPolling (socket) {
	    io.Transport['xhr-polling'].apply(this, arguments);

	    this.index = io.j.length;

	    var self = this;

	    io.j.push(function (msg) {
	      self._(msg);
	    });
	  };

	  /**
	   * Inherits from XHR polling transport.
	   */

	  io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  JSONPPolling.prototype.name = 'jsonp-polling';

	  /**
	   * Posts a encoded message to the Socket.IO server using an iframe.
	   * The iframe is used because script tags can create POST based requests.
	   * The iframe is positioned outside of the view so the user does not
	   * notice it's existence.
	   *
	   * @param {String} data A encoded message.
	   * @api private
	   */

	  JSONPPolling.prototype.post = function (data) {
	    var self = this
	      , query = io.util.query(
	             this.socket.options.query
	          , 't='+ (+new Date) + '&i=' + this.index
	        );

	    if (!this.form) {
	      var form = document.createElement('form')
	        , area = document.createElement('textarea')
	        , id = this.iframeId = 'socketio_iframe_' + this.index
	        , iframe;

	      form.className = 'socketio';
	      form.style.position = 'absolute';
	      form.style.top = '0px';
	      form.style.left = '0px';
	      form.style.display = 'none';
	      form.target = id;
	      form.method = 'POST';
	      form.setAttribute('accept-charset', 'utf-8');
	      area.name = 'd';
	      form.appendChild(area);
	      document.body.appendChild(form);

	      this.form = form;
	      this.area = area;
	    }

	    this.form.action = this.prepareUrl() + query;

	    function complete () {
	      initIframe();
	      self.socket.setBuffer(false);
	    };

	    function initIframe () {
	      if (self.iframe) {
	        self.form.removeChild(self.iframe);
	      }

	      try {
	        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	        iframe = document.createElement('<iframe name="'+ self.iframeId +'">');
	      } catch (e) {
	        iframe = document.createElement('iframe');
	        iframe.name = self.iframeId;
	      }

	      iframe.id = self.iframeId;

	      self.form.appendChild(iframe);
	      self.iframe = iframe;
	    };

	    initIframe();

	    // we temporarily stringify until we figure out how to prevent
	    // browsers from turning `\n` into `\r\n` in form inputs
	    this.area.value = io.JSON.stringify(data);

	    try {
	      this.form.submit();
	    } catch(e) {}

	    if (this.iframe.attachEvent) {
	      iframe.onreadystatechange = function () {
	        if (self.iframe.readyState == 'complete') {
	          complete();
	        }
	      };
	    } else {
	      this.iframe.onload = complete;
	    }

	    this.socket.setBuffer(true);
	  };
	  
	  /**
	   * Creates a new JSONP poll that can be used to listen
	   * for messages from the Socket.IO server.
	   *
	   * @api private
	   */

	  JSONPPolling.prototype.get = function () {
	    var self = this
	      , script = document.createElement('script')
	      , query = io.util.query(
	             this.socket.options.query
	          , 't='+ (+new Date) + '&i=' + this.index
	        );

	    if (this.script) {
	      this.script.parentNode.removeChild(this.script);
	      this.script = null;
	    }

	    script.async = true;
	    script.src = this.prepareUrl() + query;
	    script.onerror = function () {
	      self.onClose();
	    };

	    var insertAt = document.getElementsByTagName('script')[0]
	    insertAt.parentNode.insertBefore(script, insertAt);
	    this.script = script;

	    if (indicator) {
	      setTimeout(function () {
	        var iframe = document.createElement('iframe');
	        document.body.appendChild(iframe);
	        document.body.removeChild(iframe);
	      }, 100);
	    }
	  };

	  /**
	   * Callback function for the incoming message stream from the Socket.IO server.
	   *
	   * @param {String} data The message
	   * @api private
	   */

	  JSONPPolling.prototype._ = function (msg) {
	    this.onData(msg);
	    if (this.isOpen) {
	      this.get();
	    }
	    return this;
	  };

	  /**
	   * The indicator hack only works after onload
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  JSONPPolling.prototype.ready = function (socket, fn) {
	    var self = this;
	    if (!indicator) return fn.call(this);

	    io.util.load(function () {
	      fn.call(self);
	    });
	  };

	  /**
	   * Checks if browser supports this transport.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  JSONPPolling.check = function () {
	    return 'document' in global;
	  };

	  /**
	   * Check if cross domain requests are supported
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  JSONPPolling.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('jsonp-polling');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)(module)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Entity = __webpack_require__(29);
	var SpecParser = __webpack_require__(33);

	/**
	 * A wrapper for inserting a renderable component (like a Modifer or
	 *   Surface) into the render tree.
	 *
	 * @class RenderNode
	 * @constructor
	 *
	 * @param {Object} object Target renderable component
	 */
	function RenderNode(object) {
	    this._object = null;
	    this._child = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = false;
	    this._isModifier = false;

	    this._resultCache = {};
	    this._prevResults = {};

	    this._childResult = null;

	    if (object) this.set(object);
	}

	/**
	 * Append a renderable to the list of this node's children.
	 *   This produces a new RenderNode in the tree.
	 *   Note: Does not double-wrap if child is a RenderNode already.
	 *
	 * @method add
	 * @param {Object} child renderable object
	 * @return {RenderNode} new render node wrapping child
	 */
	RenderNode.prototype.add = function add(child) {
	    var childNode = (child instanceof RenderNode) ? child : new RenderNode(child);
	    if (this._child instanceof Array) this._child.push(childNode);
	    else if (this._child) {
	        this._child = [this._child, childNode];
	        this._hasMultipleChildren = true;
	        this._childResult = []; // to be used later
	    }
	    else this._child = childNode;

	    return childNode;
	};

	/**
	 * Return the single wrapped object.  Returns null if this node has multiple child nodes.
	 *
	 * @method get
	 *
	 * @return {Ojbect} contained renderable object
	 */
	RenderNode.prototype.get = function get() {
	    return this._object || (this._hasMultipleChildren ? null : (this._child ? this._child.get() : null));
	};

	/**
	 * Overwrite the list of children to contain the single provided object
	 *
	 * @method set
	 * @param {Object} child renderable object
	 * @return {RenderNode} this render node, or child if it is a RenderNode
	 */
	RenderNode.prototype.set = function set(child) {
	    this._childResult = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = child.render ? true : false;
	    this._isModifier = child.modify ? true : false;
	    this._object = child;
	    this._child = null;
	    if (child instanceof RenderNode) return child;
	    else return this;
	};

	/**
	 * Get render size of contained object.
	 *
	 * @method getSize
	 * @return {Array.Number} size of this or size of single child.
	 */
	RenderNode.prototype.getSize = function getSize() {
	    var result = null;
	    var target = this.get();
	    if (target && target.getSize) result = target.getSize();
	    if (!result && this._child && this._child.getSize) result = this._child.getSize();
	    return result;
	};

	// apply results of rendering this subtree to the document
	function _applyCommit(spec, context, cacheStorage) {
	    var result = SpecParser.parse(spec, context);
	    var keys = Object.keys(result);
	    for (var i = 0; i < keys.length; i++) {
	        var id = keys[i];
	        var childNode = Entity.get(id);
	        var commitParams = result[id];
	        commitParams.allocator = context.allocator;
	        var commitResult = childNode.commit(commitParams);
	        if (commitResult) _applyCommit(commitResult, context, cacheStorage);
	        else cacheStorage[id] = commitParams;
	    }
	}

	/**
	 * Commit the content change from this node to the document.
	 *
	 * @private
	 * @method commit
	 * @param {Context} context render context
	 */
	RenderNode.prototype.commit = function commit(context) {
	    // free up some divs from the last loop
	    var prevKeys = Object.keys(this._prevResults);
	    for (var i = 0; i < prevKeys.length; i++) {
	        var id = prevKeys[i];
	        if (this._resultCache[id] === undefined) {
	            var object = Entity.get(id);
	            if (object.cleanup) object.cleanup(context.allocator);
	        }
	    }

	    this._prevResults = this._resultCache;
	    this._resultCache = {};
	    _applyCommit(this.render(), context, this._resultCache);
	};

	/**
	 * Generate a render spec from the contents of the wrapped component.
	 *
	 * @private
	 * @method render
	 *
	 * @return {Object} render specification for the component subtree
	 *    only under this node.
	 */
	RenderNode.prototype.render = function render() {
	    if (this._isRenderable) return this._object.render();

	    var result = null;
	    if (this._hasMultipleChildren) {
	        result = this._childResult;
	        var children = this._child;
	        for (var i = 0; i < children.length; i++) {
	            result[i] = children[i].render();
	        }
	    }
	    else if (this._child) result = this._child.render();

	    return this._isModifier ? this._object.modify(result) : result;
	};

	module.exports = RenderNode;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 * Internal helper object to Context that handles the process of
	 *   creating and allocating DOM elements within a managed div.
	 *   Private.
	 *
	 * @class ElementAllocator
	 * @constructor
	 * @private
	 * @param {Node} container document element in which Famo.us content will be inserted
	 */
	function ElementAllocator(container) {
	    if (!container) container = document.createDocumentFragment();
	    this.container = container;
	    this.detachedNodes = {};
	    this.nodeCount = 0;
	}

	/**
	 * Move the document elements from their original container to a new one.
	 *
	 * @private
	 * @method migrate
	 *
	 * @param {Node} container document element to which Famo.us content will be migrated
	 */
	ElementAllocator.prototype.migrate = function migrate(container) {
	    var oldContainer = this.container;
	    if (container === oldContainer) return;

	    if (oldContainer instanceof DocumentFragment) {
	        container.appendChild(oldContainer);
	    }
	    else {
	        while (oldContainer.hasChildNodes()) {
	            container.appendChild(oldContainer.removeChild(oldContainer.firstChild));
	        }
	    }

	    this.container = container;
	};

	/**
	 * Allocate an element of specified type from the pool.
	 *
	 * @private
	 * @method allocate
	 *
	 * @param {string} type type of element, e.g. 'div'
	 * @return {Node} allocated document element
	 */
	ElementAllocator.prototype.allocate = function allocate(type) {
	    type = type.toLowerCase();
	    if (!(type in this.detachedNodes)) this.detachedNodes[type] = [];
	    var nodeStore = this.detachedNodes[type];
	    var result;
	    if (nodeStore.length > 0) {
	        result = nodeStore.pop();
	    }
	    else {
	        result = document.createElement(type);
	        this.container.appendChild(result);
	    }
	    this.nodeCount++;
	    return result;
	};

	/**
	 * De-allocate an element of specified type to the pool.
	 *
	 * @private
	 * @method deallocate
	 *
	 * @param {Node} element document element to deallocate
	 */
	ElementAllocator.prototype.deallocate = function deallocate(element) {
	    var nodeType = element.nodeName.toLowerCase();
	    var nodeStore = this.detachedNodes[nodeType];
	    nodeStore.push(element);
	    this.nodeCount--;
	};

	/**
	 * Get count of total allocated nodes in the document.
	 *
	 * @private
	 * @method getNodeCount
	 *
	 * @return {Number} total node count
	 */
	ElementAllocator.prototype.getNodeCount = function getNodeCount() {
	    return this.nodeCount;
	};

	module.exports = ElementAllocator;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */



	/**
	 * EventEmitter represents a channel for events.
	 *
	 * @class EventEmitter
	 * @constructor
	 */
	function EventEmitter() {
	    this.listeners = {};
	    this._owner = this;
	}

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	EventEmitter.prototype.emit = function emit(type, event) {
	    var handlers = this.listeners[type];
	    if (handlers) {
	        for (var i = 0; i < handlers.length; i++) {
	            handlers[i].call(this._owner, event);
	        }
	    }
	    return this;
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	   EventEmitter.prototype.on = function on(type, handler) {
	    if (!(type in this.listeners)) this.listeners[type] = [];
	    var index = this.listeners[type].indexOf(handler);
	    if (index < 0) this.listeners[type].push(handler);
	    return this;
	};

	/**
	 * Alias for "on".
	 * @method addListener
	 */
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	   /**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function} handler function object to remove
	 * @return {EventEmitter} this
	 */
	EventEmitter.prototype.removeListener = function removeListener(type, handler) {
	    var index = this.listeners[type].indexOf(handler);
	    if (index >= 0) this.listeners[type].splice(index, 1);
	    return this;
	};

	/**
	 * Call event handlers with this set to owner.
	 *
	 * @method bindThis
	 *
	 * @param {Object} owner object this EventEmitter belongs to
	 */
	EventEmitter.prototype.bindThis = function bindThis(owner) {
	    this._owner = owner;
	};

	module.exports = EventEmitter;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */



	/**
	 * A singleton that maintains a global registry of Surfaces.
	 *   Private.
	 *
	 * @private
	 * @static
	 * @class Entity
	 */

	var entities = [];

	/**
	 * Get entity from global index.
	 *
	 * @private
	 * @method get
	 * @param {Number} id entity reigstration id
	 * @return {Surface} entity in the global index
	 */
	function get(id) {
	    return entities[id];
	}

	/**
	 * Overwrite entity in the global index
	 *
	 * @private
	 * @method set
	 * @param {Number} id entity reigstration id
	 * @return {Surface} entity to add to the global index
	 */
	function set(id, entity) {
	    entities[id] = entity;
	}

	/**
	 * Add entity to global index
	 *
	 * @private
	 * @method register
	 * @param {Surface} entity to add to global index
	 * @return {Number} new id
	 */
	function register(entity) {
	    var id = entities.length;
	    set(id, entity);
	    return id;
	}

	/**
	 * Remove entity from global index
	 *
	 * @private
	 * @method unregister
	 * @param {Number} id entity reigstration id
	 */
	function unregister(id) {
	    set(id, null);
	}

	module.exports = {
	    register: register,
	    unregister: unregister,
	    get: get,
	    set: set
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Utility = __webpack_require__(32);

	/**
	 * Transition meta-method to support transitioning multiple
	 *   values with scalar-only methods.
	 *
	 *
	 * @class MultipleTransition
	 * @constructor
	 *
	 * @param {Object} method Transionable class to multiplex
	 */
	function MultipleTransition(method) {
	    this.method = method;
	    this._instances = [];
	    this.state = [];
	}

	MultipleTransition.SUPPORTS_MULTIPLE = true;

	/**
	 * Get the state of each transition.
	 *
	 * @method get
	 *
	 * @return state {Number|Array} state array
	 */
	MultipleTransition.prototype.get = function get() {
	    for (var i = 0; i < this._instances.length; i++) {
	        this.state[i] = this._instances[i].get();
	    }
	    return this.state;
	};

	/**
	 * Set the end states with a shared transition, with optional callback.
	 *
	 * @method set
	 *
	 * @param {Number|Array} endState Final State.  Use a multi-element argument for multiple transitions.
	 * @param {Object} transition Transition definition, shared among all instances
	 * @param {Function} callback called when all endStates have been reached.
	 */
	MultipleTransition.prototype.set = function set(endState, transition, callback) {
	    var _allCallback = Utility.after(endState.length, callback);
	    for (var i = 0; i < endState.length; i++) {
	        if (!this._instances[i]) this._instances[i] = new (this.method)();
	        this._instances[i].set(endState[i], transition, _allCallback);
	    }
	};

	/**
	 * Reset all transitions to start state.
	 *
	 * @method reset
	 *
	 * @param  {Number|Array} startState Start state
	 */
	MultipleTransition.prototype.reset = function reset(startState) {
	    for (var i = 0; i < startState.length; i++) {
	        if (!this._instances[i]) this._instances[i] = new (this.method)();
	        this._instances[i].reset(startState[i]);
	    }
	};

	module.exports = MultipleTransition;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 *
	 * A state maintainer for a smooth transition between
	 *    numerically-specified states.  Example numeric states include floats or
	 *    Transfornm objects.
	 *
	 *    An initial state is set with the constructor or set(startValue). A
	 *    corresponding end state and transition are set with set(endValue,
	 *    transition). Subsequent calls to set(endValue, transition) begin at
	 *    the last state. Calls to get(timestamp) provide the _interpolated state
	 *    along the way.
	 *
	 *   Note that there is no event loop here - calls to get() are the only way
	 *    to find out state projected to the current (or provided) time and are
	 *    the only way to trigger callbacks. Usually this kind of object would
	 *    be part of the render() path of a visible component.
	 *
	 * @class TweenTransition
	 * @constructor
	 *
	 * @param {Object} options TODO
	 *    beginning state
	 */
	function TweenTransition(options) {
	    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
	    if (options) this.setOptions(options);

	    this._startTime = 0;
	    this._startValue = 0;
	    this._updateTime = 0;
	    this._endValue = 0;
	    this._curve = undefined;
	    this._duration = 0;
	    this._active = false;
	    this._callback = undefined;
	    this.state = 0;
	    this.velocity = undefined;
	}

	/**
	 * Transition curves mapping independent variable t from domain [0,1] to a
	 *    range within [0,1]. Includes functions 'linear', 'easeIn', 'easeOut',
	 *    'easeInOut', 'easeOutBounce', 'spring'.
	 *
	 * @property {object} Curve
	 * @final
	 */
	TweenTransition.Curves = {
	    linear: function(t) {
	        return t;
	    },
	    easeIn: function(t) {
	        return t*t;
	    },
	    easeOut: function(t) {
	        return t*(2-t);
	    },
	    easeInOut: function(t) {
	        if (t <= 0.5) return 2*t*t;
	        else return -2*t*t + 4*t - 1;
	    },
	    easeOutBounce: function(t) {
	        return t*(3 - 2*t);
	    },
	    spring: function(t) {
	        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
	    }
	};

	TweenTransition.SUPPORTS_MULTIPLE = true;
	TweenTransition.DEFAULT_OPTIONS = {
	    curve: TweenTransition.Curves.linear,
	    duration: 500,
	    speed: 0 /* considered only if positive */
	};

	var registeredCurves = {};

	/**
	 * Add "unit" curve to internal dictionary of registered curves.
	 *
	 * @method registerCurve
	 *
	 * @static
	 *
	 * @param {string} curveName dictionary key
	 * @param {unitCurve} curve function of one numeric variable mapping [0,1]
	 *    to range inside [0,1]
	 * @return {boolean} false if key is taken, else true
	 */
	TweenTransition.registerCurve = function registerCurve(curveName, curve) {
	    if (!registeredCurves[curveName]) {
	        registeredCurves[curveName] = curve;
	        return true;
	    }
	    else {
	        return false;
	    }
	};

	/**
	 * Remove object with key "curveName" from internal dictionary of registered
	 *    curves.
	 *
	 * @method unregisterCurve
	 *
	 * @static
	 *
	 * @param {string} curveName dictionary key
	 * @return {boolean} false if key has no dictionary value
	 */
	TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
	    if (registeredCurves[curveName]) {
	        delete registeredCurves[curveName];
	        return true;
	    }
	    else {
	        return false;
	    }
	};

	/**
	 * Retrieve function with key "curveName" from internal dictionary of
	 *    registered curves. Default curves are defined in the
	 *    TweenTransition.Curves array, where the values represent
	 *    unitCurve functions.
	 *
	 * @method getCurve
	 *
	 * @static
	 *
	 * @param {string} curveName dictionary key
	 * @return {unitCurve} curve function of one numeric variable mapping [0,1]
	 *    to range inside [0,1]
	 */
	TweenTransition.getCurve = function getCurve(curveName) {
	    var curve = registeredCurves[curveName];
	    if (curve !== undefined) return curve;
	    else throw new Error('curve not registered');
	};

	/**
	 * Retrieve all available curves.
	 *
	 * @method getCurves
	 *
	 * @static
	 *
	 * @return {object} curve functions of one numeric variable mapping [0,1]
	 *    to range inside [0,1]
	 */
	TweenTransition.getCurves = function getCurves() {
	    return registeredCurves;
	};

	 // Interpolate: If a linear function f(0) = a, f(1) = b, then return f(t)
	function _interpolate(a, b, t) {
	    return ((1 - t) * a) + (t * b);
	}

	function _clone(obj) {
	    if (obj instanceof Object) {
	        if (obj instanceof Array) return obj.slice(0);
	        else return Object.create(obj);
	    }
	    else return obj;
	}

	// Fill in missing properties in "transition" with those in defaultTransition, and
	//   convert internal named curve to function object, returning as new
	//   object.
	function _normalize(transition, defaultTransition) {
	    var result = {curve: defaultTransition.curve};
	    if (defaultTransition.duration) result.duration = defaultTransition.duration;
	    if (defaultTransition.speed) result.speed = defaultTransition.speed;
	    if (transition instanceof Object) {
	        if (transition.duration !== undefined) result.duration = transition.duration;
	        if (transition.curve) result.curve = transition.curve;
	        if (transition.speed) result.speed = transition.speed;
	    }
	    if (typeof result.curve === 'string') result.curve = TweenTransition.getCurve(result.curve);
	    return result;
	}

	/**
	 * Set internal options, overriding any default options.
	 *
	 * @method setOptions
	 *
	 *
	 * @param {Object} options options object
	 * @param {Object} [options.curve] function mapping [0,1] to [0,1] or identifier
	 * @param {Number} [options.duration] duration in ms
	 * @param {Number} [options.speed] speed in pixels per ms
	 */
	TweenTransition.prototype.setOptions = function setOptions(options) {
	    if (options.curve !== undefined) this.options.curve = options.curve;
	    if (options.duration !== undefined) this.options.duration = options.duration;
	    if (options.speed !== undefined) this.options.speed = options.speed;
	};

	/**
	 * Add transition to end state to the queue of pending transitions. Special
	 *    Use: calling without a transition resets the object to that state with
	 *    no pending actions
	 *
	 * @method set
	 *
	 *
	 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endValue
	 *    end state to which we _interpolate
	 * @param {transition=} transition object of type {duration: number, curve:
	 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	 *    instantaneous.
	 * @param {function()=} callback Zero-argument function to call on observed
	 *    completion (t=1)
	 */
	TweenTransition.prototype.set = function set(endValue, transition, callback) {
	    if (!transition) {
	        this.reset(endValue);
	        if (callback) callback();
	        return;
	    }

	    this._startValue = _clone(this.get());
	    transition = _normalize(transition, this.options);
	    if (transition.speed) {
	        var startValue = this._startValue;
	        if (startValue instanceof Object) {
	            var variance = 0;
	            for (var i in startValue) variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
	            transition.duration = Math.sqrt(variance) / transition.speed;
	        }
	        else {
	            transition.duration = Math.abs(endValue - startValue) / transition.speed;
	        }
	    }

	    this._startTime = Date.now();
	    this._endValue = _clone(endValue);
	    this._startVelocity = _clone(transition.velocity);
	    this._duration = transition.duration;
	    this._curve = transition.curve;
	    this._active = true;
	    this._callback = callback;
	};

	/**
	 * Cancel all transitions and reset to a stable state
	 *
	 * @method reset
	 *
	 * @param {number|Array.Number|Object.<number, number>} startValue
	 *    starting state
	 * @param {number} startVelocity
	 *    starting velocity
	 */
	TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    this.state = _clone(startValue);
	    this.velocity = _clone(startVelocity);
	    this._startTime = 0;
	    this._duration = 0;
	    this._updateTime = 0;
	    this._startValue = this.state;
	    this._startVelocity = this.velocity;
	    this._endValue = this.state;
	    this._active = false;
	};

	/**
	 * Get current velocity
	 *
	 * @method getVelocity
	 *
	 * @returns {Number} velocity
	 */
	TweenTransition.prototype.getVelocity = function getVelocity() {
	    return this.velocity;
	};

	/**
	 * Get interpolated state of current action at provided time. If the last
	 *    action has completed, invoke its callback.
	 *
	 * @method get
	 *
	 *
	 * @param {number=} timestamp Evaluate the curve at a normalized version of this
	 *    time. If omitted, use current time. (Unix epoch time)
	 * @return {number|Object.<number|string, number>} beginning state
	 *    _interpolated to this point in time.
	 */
	TweenTransition.prototype.get = function get(timestamp) {
	    this.update(timestamp);
	    return this.state;
	};

	function _calculateVelocity(current, start, curve, duration, t) {
	    var velocity;
	    var eps = 1e-7;
	    var speed = (curve(t) - curve(t - eps)) / eps;
	    if (current instanceof Array) {
	        velocity = [];
	        for (var i = 0; i < current.length; i++){
	            if (typeof current[i] === 'number')
	                velocity[i] = speed * (current[i] - start[i]) / duration;
	            else
	                velocity[i] = 0;
	        }

	    }
	    else velocity = speed * (current - start) / duration;
	    return velocity;
	}

	function _calculateState(start, end, t) {
	    var state;
	    if (start instanceof Array) {
	        state = [];
	        for (var i = 0; i < start.length; i++) {
	            if (typeof start[i] === 'number')
	                state[i] = _interpolate(start[i], end[i], t);
	            else
	                state[i] = start[i];
	        }
	    }
	    else state = _interpolate(start, end, t);
	    return state;
	}

	/**
	 * Update internal state to the provided timestamp. This may invoke the last
	 *    callback and begin a new action.
	 *
	 * @method update
	 *
	 *
	 * @param {number=} timestamp Evaluate the curve at a normalized version of this
	 *    time. If omitted, use current time. (Unix epoch time)
	 */
	TweenTransition.prototype.update = function update(timestamp) {
	    if (!this._active) {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        return;
	    }

	    if (!timestamp) timestamp = Date.now();
	    if (this._updateTime >= timestamp) return;
	    this._updateTime = timestamp;

	    var timeSinceStart = timestamp - this._startTime;
	    if (timeSinceStart >= this._duration) {
	        this.state = this._endValue;
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
	        this._active = false;
	    }
	    else if (timeSinceStart < 0) {
	        this.state = this._startValue;
	        this.velocity = this._startVelocity;
	    }
	    else {
	        var t = timeSinceStart / this._duration;
	        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
	    }
	};

	/**
	 * Is there at least one action pending completion?
	 *
	 * @method isActive
	 *
	 *
	 * @return {boolean}
	 */
	TweenTransition.prototype.isActive = function isActive() {
	    return this._active;
	};

	/**
	 * Halt transition at current state and erase all pending actions.
	 *
	 * @method halt
	 *
	 */
	TweenTransition.prototype.halt = function halt() {
	    this.reset(this.get());
	};

	// Register all the default curves
	TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
	TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
	TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
	TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
	TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
	TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);

	TweenTransition.customCurve = function customCurve(v1, v2) {
	    v1 = v1 || 0; v2 = v2 || 0;
	    return function(t) {
	        return v1*t + (-2*v1 - v2 + 3)*t*t + (v1 + v2 - 2)*t*t*t;
	    };
	};

	module.exports = TweenTransition;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */



	/**
	 * This namespace holds standalone functionality.
	 *  Currently includes name mapping for transition curves,
	 *  name mapping for origin pairs, and the after() function.
	 *
	 * @class Utility
	 * @static
	 */
	var Utility = {};

	/**
	 * Table of direction array positions
	 *
	 * @property {object} Direction
	 * @final
	 */
	Utility.Direction = {
	    X: 0,
	    Y: 1,
	    Z: 2
	};

	/**
	 * Return wrapper around callback function. Once the wrapper is called N
	 *   times, invoke the callback function. Arguments and scope preserved.
	 *
	 * @method after
	 *
	 * @param {number} count number of calls before callback function invoked
	 * @param {Function} callback wrapped callback function
	 *
	 * @return {function} wrapped callback with coundown feature
	 */
	Utility.after = function after(count, callback) {
	    var counter = count;
	    return function() {
	        counter--;
	        if (counter === 0) callback.apply(this, arguments);
	    };
	};

	/**
	 * Load a URL and return its contents in a callback
	 *
	 * @method loadURL
	 *
	 * @param {string} url URL of object
	 * @param {function} callback callback to dispatch with content
	 */
	Utility.loadURL = function loadURL(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function onreadystatechange() {
	        if (this.readyState === 4) {
	            if (callback) callback(this.responseText);
	        }
	    };
	    xhr.open('GET', url);
	    xhr.send();
	};

	/**
	 * Create a document fragment from a string of HTML
	 *
	 * @method createDocumentFragmentFromHTML
	 *
	 * @param {string} html HTML to convert to DocumentFragment
	 *
	 * @return {DocumentFragment} DocumentFragment representing input HTML
	 */
	Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
	    var element = document.createElement('div');
	    element.innerHTML = html;
	    var result = document.createDocumentFragment();
	    while (element.hasChildNodes()) result.appendChild(element.firstChild);
	    return result;
	};

	module.exports = Utility;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Transform = __webpack_require__(6);

	/**
	 *
	 * This object translates the rendering instructions ("render specs")
	 *   that renderable components generate into document update
	 *   instructions ("update specs").  Private.
	 *
	 * @private
	 * @class SpecParser
	 * @constructor
	 */
	function SpecParser() {
	    this.result = {};
	}
	SpecParser._instance = new SpecParser();

	/**
	 * Convert a render spec coming from the context's render chain to an
	 *    update spec for the update chain. This is the only major entry point
	 *    for a consumer of this class.
	 *
	 * @method parse
	 * @static
	 * @private
	 *
	 * @param {renderSpec} spec input render spec
	 * @param {Object} context context to do the parse in
	 * @return {Object} the resulting update spec (if no callback
	 *   specified, else none)
	 */
	SpecParser.parse = function parse(spec, context) {
	    return SpecParser._instance.parse(spec, context);
	};

	/**
	 * Convert a renderSpec coming from the context's render chain to an update
	 *    spec for the update chain. This is the only major entrypoint for a
	 *    consumer of this class.
	 *
	 * @method parse
	 *
	 * @private
	 * @param {renderSpec} spec input render spec
	 * @param {Context} context
	 * @return {updateSpec} the resulting update spec
	 */
	SpecParser.prototype.parse = function parse(spec, context) {
	    this.reset();
	    this._parseSpec(spec, context, Transform.identity);
	    return this.result;
	};

	/**
	 * Prepare SpecParser for re-use (or first use) by setting internal state
	 *  to blank.
	 *
	 * @private
	 * @method reset
	 */
	SpecParser.prototype.reset = function reset() {
	    this.result = {};
	};

	// Multiply matrix M by vector v
	function _vecInContext(v, m) {
	    return [
	        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
	        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
	        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
	    ];
	}

	var _originZeroZero = [0, 0];

	// From the provided renderSpec tree, recursively compose opacities,
	//    origins, transforms, and sizes corresponding to each surface id from
	//    the provided renderSpec tree structure. On completion, those
	//    properties of 'this' object should be ready to use to build an
	//    updateSpec.
	SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
	    var id;
	    var target;
	    var transform;
	    var opacity;
	    var origin;
	    var align;
	    var size;

	    if (typeof spec === 'number') {
	        id = spec;
	        transform = parentContext.transform;
	        align = parentContext.align || parentContext.origin;
	        if (parentContext.size && align && (align[0] || align[1])) {
	            var alignAdjust = [align[0] * parentContext.size[0], align[1] * parentContext.size[1], 0];
	            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
	        }
	        this.result[id] = {
	            transform: transform,
	            opacity: parentContext.opacity,
	            origin: parentContext.origin || _originZeroZero,
	            align: parentContext.align || parentContext.origin || _originZeroZero,
	            size: parentContext.size
	        };
	    }
	    else if (!spec) { // placed here so 0 will be cached earlier
	        return;
	    }
	    else if (spec instanceof Array) {
	        for (var i = 0; i < spec.length; i++) {
	            this._parseSpec(spec[i], parentContext, sizeContext);
	        }
	    }
	    else {
	        target = spec.target;
	        transform = parentContext.transform;
	        opacity = parentContext.opacity;
	        origin = parentContext.origin;
	        align = parentContext.align;
	        size = parentContext.size;
	        var nextSizeContext = sizeContext;

	        if (spec.opacity !== undefined) opacity = parentContext.opacity * spec.opacity;
	        if (spec.transform) transform = Transform.multiply(parentContext.transform, spec.transform);
	        if (spec.origin) {
	            origin = spec.origin;
	            nextSizeContext = parentContext.transform;
	        }
	        if (spec.align) align = spec.align;
	        if (spec.size) {
	            var parentSize = parentContext.size;
	            size = [
	                spec.size[0] !== undefined ? spec.size[0] : parentSize[0],
	                spec.size[1] !== undefined ? spec.size[1] : parentSize[1]
	            ];
	            if (parentSize) {
	                if (!align) align = origin;
	                if (align && (align[0] || align[1])) transform = Transform.thenMove(transform, _vecInContext([align[0] * parentSize[0], align[1] * parentSize[1], 0], sizeContext));
	                if (origin && (origin[0] || origin[1])) transform = Transform.moveThen([-origin[0] * size[0], -origin[1] * size[1], 0], transform);
	            }
	            nextSizeContext = parentContext.transform;
	            origin = null;
	            align = null;
	        }

	        this._parseSpec(target, {
	            transform: transform,
	            opacity: opacity,
	            origin: origin,
	            align: align,
	            size: size
	        }, nextSizeContext);
	    }
	};

	module.exports = SpecParser;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])