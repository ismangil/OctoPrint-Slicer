/*
 * View model for OctoPrint-Slicer
 *
 * Author: Kenneth Jiang
 * License: AGPLv3
 */
$(function() {
    function SlicerViewModel(parameters) {
        var self = this;

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        // self.settingsViewModel = parameters[1];

        // TODO: Implement your plugin's view model here.
        $(document).on("click", ".btn-mini[title='Slice']", function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            $('a[href="#tab_plugin_slicer"]').tab('show');
        });


        var container;

        var camera, cameraTarget, scene, renderer,
        CANVAS_WIDTH = 588,
        CANVAS_HEIGHT = 588;

        init();
        animate();

        function init() {
            container = document.getElementById( 'slicer-canvas' );

            camera = new THREE.PerspectiveCamera( 35, 1.0, 0.1, 100 );
            camera.position.set( 3, 0.15, 3 );
            scene = new THREE.Scene();
            scene.add( new THREE.GridHelper( 10, 0.2 ) );

            var loader = new THREE.STLLoader();
            loader.load(BASEURL + "downloads/files/" + "local" + "/" + "fish_fossilz.stl", function ( geometry ) {

                var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
                var mesh = new THREE.Mesh( geometry, material );
                mesh.scale.set( 0.02, 0.02, 0.02 );

                scene.add( mesh );
            } );


            // Lights

            scene.add( new THREE.AmbientLight(0xffffff, 1.0) );

            // renderer

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
            renderer.setPixelRatio( window.devicePixelRatio );

            renderer.gammaInput = true;
            renderer.gammaOutput = true;
/*
    		$("#slicer-viewport").empty().append(`
    			<div class="model">
    				<button class="import" title="Import"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/import.png"></button>
    				<button class="translate disabled" title="Translate"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/translate.png"></button>
    				<button class="rotate" title="Rotate"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/rotate.png"></button>
    				<button class="scale" title="Scale"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/scale.png"></button>
    				<button class="snap" title="Snap"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/snap.png"></button>
    				<button class="delete disabled" title="Delete"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/delete.png"></button>
    				<button class="clone disabled" title="Clone"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/clone.png"></button>
    				<button class="reset disabled" title="Reset"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/reset.png"></button>
    				<button class="cut" title="Cut"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/cut.png"></button>
    				<button class="merge" title="Merge"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/merge.png"></button>
    			</div>
    			<div class="values translate">
    				<div>
    					<p><span class="axis x">X</span><input type="number" step="any" name="x"><span></span></p>
    					<p><span class="axis y">Y</span><input type="number" step="any" name="y"><span></span></p>
    					<p><span class="axis z">Z</span><input type="number" step="any" name="z"><span></span></p>
    					<span></span>
    				</div>
    			</div>
    			<div class="cutShape">
    				<div>
    					<button class="cube disabled" title="Cube"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/cube.png"></button>
    					<button class="sphere" title="Sphere"><img src="` + PLUGIN_BASEURL + `m33fio/static/img/sphere.png"></button>
    					<span></span>
    				</div>
    			</div>
    		`);
   */
		    $("#slicer-viewport").append(renderer.domElement);
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = false;

        }

        function animate() {
            requestAnimationFrame( animate );
            render();
        }

        function render() {
            controls.update();
            renderer.render( scene, camera );

        }

    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
        SlicerViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
        [ /* "loginStateViewModel", "settingsViewModel" */ ],

        // e.g. #settings_plugin_slicer, #tab_plugin_slicer, ...
        [ /* ... */ ]
    ]);
});
