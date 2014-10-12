var Surface = require('famous/core/Surface');

var getPointerEvent = function(event) {
        return event.targetTouches ? event.targetTouches[0] : event;
    },

    setListener = function(surface, events, callback) {
        var eventsArray = events.split(' '), i = eventsArray.length;
        while (i--) {
            surface.on(eventsArray[i], callback);
        }
    };

function addTapEvent(surface) {
    var touching = false,
        canFire = false,
        currentX = 0,
        currentY = 0,
        startX = 0,
        startY = 0,
        tapEvent = null,
        fireTap = function(){
            xNotMoved = Math.abs(startX - currentX) < 10;
            yNotMoved = Math.abs(startY - currentY) < 10; 
            if (canFire && !touching && xNotMoved && yNotMoved) {
                surface.emit('tap',tapEvent);
            }
            canFire = false;
        };

    //setting the events listeners
    setListener(surface, 'touchstart mousedown', function(e) {
        e.preventDefault();
        var pointer = getPointerEvent(e);
        startX = currentX = pointer.pageX;
        startY = currentY = pointer.pageY;
        touching = true;
        canFire = true;
        tapEvent = e;

        // detecting if after 200ms the finger is still in the same position
        setTimeout(fireTap, 200);
    });

    setListener(surface, 'touchend mouseup touchcancel', function(e) {
        e.preventDefault();
        touching = false;
        fireTap();
    });

    setListener(surface, 'touchmove mousemove', function(e) {
        e.preventDefault();
        var pointer = getPointerEvent(e);
        currentX = pointer.pageX;
        currentY = pointer.pageY;
    });
}

var _surfaceOn = Surface.prototype.on;
Surface.prototype.on = function on(type,fn) {
    if(type == "tap" && !this.tapEnabled){
        addTapEvent(this);
        this.tapEnabled = true;
    }
    _surfaceOn.call(this,type,fn);
};