var Application = (function() {
'ure strict';

function Application() {
    this._renderingContext = null;
    this._$canvas = null;
    this._navbar = null;
    this._openFileDialog = null;

    this._init();
}

var _ = Application.prototype;

_._init = function() {
    this._renderingContext = new RenderingContext();
    this._$canvas = $(this._renderingContext.getCanvas());
    this._$canvas.addClass('renderer');
    $(document.body).append(this._$canvas);

    $(window).resize(function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        this._renderingContext.resize(w, h);
    }.bind(this));
    $(window).resize();

    this._openFileDialog = new OpenFileDialog({
        onLoad: function(data, size, bits) {
            var volume = new Volume(data, size.x, size.y, size.z, bits);
            this._renderingContext.setVolume(volume);
            this._renderingContext._renderer.reset();
        }.bind(this)
    });

    this._navbar = new Navbar(document.body, {
        onOpenFile: function() {
            this._openFileDialog.show();
        }.bind(this),
        onResetRenderer: function() {
            this._renderingContext._renderer.reset();
        }.bind(this)
    });

    this._renderingContext.startRendering();
};

_.destroy = function() {
    this._renderingContext.destroy();
    this._navbar.destroy();
    this._$canvas.remove();
};

return Application;

})();
