(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof __require__ == "function" && __require__;
				if (!u && a)
					return a(o, !0);
				if (i)
					return i(o, !0);
				throw new Error("Cannot find module '" + o + "'")
			}
			var f = n[o] = {
				exports : {}
			};
			t[o][0].call(f.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, f, f.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof __require__ == "function" && __require__;
	for (var o = 0; o < r.length; o++)
		s(r[o]);
	return s
})({1:[function(_dereq_,module,exports){
'use strict';

function injectStylesheet(doc, href) {
  var link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  doc.head.appendChild(link);
}

function injectScript(doc, src) {
  var script = doc.createElement('script');
  script.type = 'text/javascript';
  script.src = src;

  // Set 'async' to false to maintain execution order of scripts.
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
  script.async = false;
  doc.head.appendChild(script);
}

function injectAssets(doc, config, assets) {
  assets.forEach(function (path) {
    var url = config.assetRoot + 'build/' + config.manifest[path];
    if (url.match(/\.css/)) {
      injectStylesheet(doc, url);
    } else {
      injectScript(doc, url);
    }
  });
}

/**
 * Bootstrap the Hypothesis client.
 *
 * This triggers loading of the necessary resources for the client
 */
function bootHypothesisClient(doc, config) {
  // Detect presence of Hypothesis in the page
  var appLinkEl = doc.querySelector('link[type="application/annotator+html"]');
  if (appLinkEl) {
    return;
  }

  // Register the URL of the sidebar app which the Hypothesis client should load.
  // The <link> tag is also used by browser extensions etc. to detect the
  // presence of the Hypothesis client on the page.
  var sidebarUrl = doc.createElement('link');
  sidebarUrl.rel = 'sidebar';
  sidebarUrl.href = config.sidebarAppUrl;
  sidebarUrl.type = 'application/annotator+html';
  doc.head.appendChild(sidebarUrl);

  // Register the URL of the sidebar app which the Hypothesis client should load.
  // The <link> tag is also used by browser extensions etc. to detect the
  // presence of the Hypothesis client on the page.
  if (config.clipperAppUrl) {
    var clipperUrl = doc.createElement('link');
    clipperUrl.rel = 'clipper';
    clipperUrl.href = config.clipperAppUrl;
    clipperUrl.type = 'application/annotator+html';
    doc.head.appendChild(clipperUrl);
  }

  // Register the URL of the annotation client which is currently being used to drive
  // annotation interactions.
  var clientUrl = doc.createElement('link');
  clientUrl.rel = 'hypothesis-client';
  clientUrl.href = config.assetRoot + 'build/boot.js';
  clientUrl.type = 'application/annotator+javascript';
  doc.head.appendChild(clientUrl);

  injectAssets(doc, config, [
  // Vendor code and polyfills
  'scripts/polyfills.bundle.js', 'scripts/jquery.bundle.js', 'scripts/turndown.bundle.js', 'scripts/turndownPluginGfm.bundle.js', 'scripts/showdown.bundle.js',

  // Main entry point for the client
  'scripts/annotator.bundle.js', 'styles/icomoon.css', 'styles/annotator.css', 'styles/pdfjs-overrides.css']);
}

/**
 * Bootstrap the sidebar application which displays annotations.
 */
function bootSidebarApp(doc, config) {
  injectAssets(doc, config, [
  // Vendor code and polyfills required by app.bundle.js
  'scripts/raven.bundle.js', 'scripts/angular.bundle.js', 'scripts/katex.bundle.js', 'scripts/showdown.bundle.js', 'scripts/polyfills.bundle.js', 'scripts/unorm.bundle.js', 'scripts/underscore.bundle.js',
  // The sidebar app
  'scripts/sidebar.bundle.js', 'styles/select.css', 'styles/bootstrap.css', 'styles/pretty-checkbox.css', 'styles/angular-csp.css', 'styles/angular-toastr.css', 'styles/icomoon.css', 'styles/katex.min.css', 'styles/sidebar.css', 'styles/rzslider.css']);
}

/**
 * Bootstrap the clipper application which displays webclipper.
 */
function bootClipperApp(doc, config) {
  injectAssets(doc, config, ['scripts/angular.bundle.js', 'scripts/clipper.bundle.js',
  // mozilla readability bundle
  'styles/aboutReader.css', 'styles/angular-csp.css', 'styles/angular-toastr.css', 'styles/clipper.css', 'styles/rzslider.css']);
}

function boot(document_, config) {
  if (document_.querySelector('hypothesis-app')) {
    bootSidebarApp(document_, config);
  } else if (document_.querySelector('clipper-app')) {
    bootClipperApp(document_, config);
  } else {
    bootHypothesisClient(document_, config);
  }
}

module.exports = boot;

},{}],2:[function(_dereq_,module,exports){
'use strict';

// This is the main entry point for the Hypothesis client in the host page
// and the sidebar application.
//
// The same boot script is used for both entry points so that the browser
// already has it cached when it encounters the reference in the sidebar
// application.

// Variables replaced by the build script

/* global {"fonts/KaTeX_AMS-Regular.woff":"fonts/KaTeX_AMS-Regular.woff?d1708b","fonts/KaTeX_Caligraphic-Bold.woff":"fonts/KaTeX_Caligraphic-Bold.woff?bce727","fonts/KaTeX_Caligraphic-Regular.woff":"fonts/KaTeX_Caligraphic-Regular.woff?ff0a2a","fonts/KaTeX_Fraktur-Bold.woff":"fonts/KaTeX_Fraktur-Bold.woff?4fe167","fonts/KaTeX_Fraktur-Regular.woff":"fonts/KaTeX_Fraktur-Regular.woff?22ac05","fonts/KaTeX_Main-Bold.woff":"fonts/KaTeX_Main-Bold.woff?355529","fonts/KaTeX_Main-Italic.woff":"fonts/KaTeX_Main-Italic.woff?0bf8cb","fonts/KaTeX_Main-Regular.woff":"fonts/KaTeX_Main-Regular.woff?76c0fe","fonts/KaTeX_Math-BoldItalic.woff":"fonts/KaTeX_Math-BoldItalic.woff?9a79de","fonts/KaTeX_Math-Italic.woff":"fonts/KaTeX_Math-Italic.woff?a0c5a3","fonts/KaTeX_Math-Regular.woff":"fonts/KaTeX_Math-Regular.woff?741de0","fonts/KaTeX_SansSerif-Bold.woff":"fonts/KaTeX_SansSerif-Bold.woff?0b932c","fonts/KaTeX_SansSerif-Italic.woff":"fonts/KaTeX_SansSerif-Italic.woff?c0cfcc","fonts/KaTeX_SansSerif-Regular.woff":"fonts/KaTeX_SansSerif-Regular.woff?0d52ce","fonts/KaTeX_Script-Regular.woff":"fonts/KaTeX_Script-Regular.woff?30b05b","fonts/KaTeX_Size1-Regular.woff":"fonts/KaTeX_Size1-Regular.woff?ac63f8","fonts/KaTeX_Size2-Regular.woff":"fonts/KaTeX_Size2-Regular.woff?80afd2","fonts/KaTeX_Size3-Regular.woff":"fonts/KaTeX_Size3-Regular.woff?579c05","fonts/KaTeX_Size4-Regular.woff":"fonts/KaTeX_Size4-Regular.woff?44c744","fonts/KaTeX_Typewriter-Regular.woff":"fonts/KaTeX_Typewriter-Regular.woff?6641c6","fonts/h.woff":"fonts/h.woff?fddb8a","scripts/angular.bundle.js":"scripts/angular.bundle.js?763302","scripts/annotator.bundle.js":"scripts/annotator.bundle.js?669cb8","scripts/boot.bundle.js":"scripts/boot.bundle.js?9743e6","scripts/clipper.bundle.js":"scripts/clipper.bundle.js?28178e","scripts/jquery.bundle.js":"scripts/jquery.bundle.js?6a2de9","scripts/katex.bundle.js":"scripts/katex.bundle.js?ceb3ac","scripts/polyfills.bundle.js":"scripts/polyfills.bundle.js?887048","scripts/raven.bundle.js":"scripts/raven.bundle.js?2d50ee","scripts/showdown.bundle.js":"scripts/showdown.bundle.js?3004eb","scripts/sidebar.bundle.js":"scripts/sidebar.bundle.js?711505","scripts/turndown.bundle.js":"scripts/turndown.bundle.js?77e7c4","scripts/turndownPluginGfm.bundle.js":"scripts/turndownPluginGfm.bundle.js?f0146b","scripts/underscore.bundle.js":"scripts/underscore.bundle.js?b7038c","scripts/unorm.bundle.js":"scripts/unorm.bundle.js?5f0486","styles/aboutReader.css":"styles/aboutReader.css?5e5ae4","styles/angular-csp.css":"styles/angular-csp.css?e61a94","styles/angular-toastr.css":"styles/angular-toastr.css?b84bea","styles/annotator.css":"styles/annotator.css?0177be","styles/bootstrap.css":"styles/bootstrap.css?65fac1","styles/clipper.css":"styles/clipper.css?9a8591","styles/icomoon.css":"styles/icomoon.css?a94f04","styles/katex.min.css":"styles/katex.min.css?43cde2","styles/pdfjs-overrides.css":"styles/pdfjs-overrides.css?28636f","styles/pretty-checkbox.css":"styles/pretty-checkbox.css?510e75","styles/rzslider.css":"styles/rzslider.css?1ab012","styles/select.css":"styles/select.css?44b81e","styles/sidebar.css":"styles/sidebar.css?70de78"} */

var boot = _dereq_('./boot');
var settings = _dereq_('../shared/settings').jsonConfigsFrom(document);

boot(document, {
  assetRoot: settings.assetRoot || 'http://localhost:3001/hypothesis/1.82.0.415/',
  manifest: {"fonts/KaTeX_AMS-Regular.woff":"fonts/KaTeX_AMS-Regular.woff?d1708b","fonts/KaTeX_Caligraphic-Bold.woff":"fonts/KaTeX_Caligraphic-Bold.woff?bce727","fonts/KaTeX_Caligraphic-Regular.woff":"fonts/KaTeX_Caligraphic-Regular.woff?ff0a2a","fonts/KaTeX_Fraktur-Bold.woff":"fonts/KaTeX_Fraktur-Bold.woff?4fe167","fonts/KaTeX_Fraktur-Regular.woff":"fonts/KaTeX_Fraktur-Regular.woff?22ac05","fonts/KaTeX_Main-Bold.woff":"fonts/KaTeX_Main-Bold.woff?355529","fonts/KaTeX_Main-Italic.woff":"fonts/KaTeX_Main-Italic.woff?0bf8cb","fonts/KaTeX_Main-Regular.woff":"fonts/KaTeX_Main-Regular.woff?76c0fe","fonts/KaTeX_Math-BoldItalic.woff":"fonts/KaTeX_Math-BoldItalic.woff?9a79de","fonts/KaTeX_Math-Italic.woff":"fonts/KaTeX_Math-Italic.woff?a0c5a3","fonts/KaTeX_Math-Regular.woff":"fonts/KaTeX_Math-Regular.woff?741de0","fonts/KaTeX_SansSerif-Bold.woff":"fonts/KaTeX_SansSerif-Bold.woff?0b932c","fonts/KaTeX_SansSerif-Italic.woff":"fonts/KaTeX_SansSerif-Italic.woff?c0cfcc","fonts/KaTeX_SansSerif-Regular.woff":"fonts/KaTeX_SansSerif-Regular.woff?0d52ce","fonts/KaTeX_Script-Regular.woff":"fonts/KaTeX_Script-Regular.woff?30b05b","fonts/KaTeX_Size1-Regular.woff":"fonts/KaTeX_Size1-Regular.woff?ac63f8","fonts/KaTeX_Size2-Regular.woff":"fonts/KaTeX_Size2-Regular.woff?80afd2","fonts/KaTeX_Size3-Regular.woff":"fonts/KaTeX_Size3-Regular.woff?579c05","fonts/KaTeX_Size4-Regular.woff":"fonts/KaTeX_Size4-Regular.woff?44c744","fonts/KaTeX_Typewriter-Regular.woff":"fonts/KaTeX_Typewriter-Regular.woff?6641c6","fonts/h.woff":"fonts/h.woff?fddb8a","scripts/angular.bundle.js":"scripts/angular.bundle.js?763302","scripts/annotator.bundle.js":"scripts/annotator.bundle.js?669cb8","scripts/boot.bundle.js":"scripts/boot.bundle.js?9743e6","scripts/clipper.bundle.js":"scripts/clipper.bundle.js?28178e","scripts/jquery.bundle.js":"scripts/jquery.bundle.js?6a2de9","scripts/katex.bundle.js":"scripts/katex.bundle.js?ceb3ac","scripts/polyfills.bundle.js":"scripts/polyfills.bundle.js?887048","scripts/raven.bundle.js":"scripts/raven.bundle.js?2d50ee","scripts/showdown.bundle.js":"scripts/showdown.bundle.js?3004eb","scripts/sidebar.bundle.js":"scripts/sidebar.bundle.js?711505","scripts/turndown.bundle.js":"scripts/turndown.bundle.js?77e7c4","scripts/turndownPluginGfm.bundle.js":"scripts/turndownPluginGfm.bundle.js?f0146b","scripts/underscore.bundle.js":"scripts/underscore.bundle.js?b7038c","scripts/unorm.bundle.js":"scripts/unorm.bundle.js?5f0486","styles/aboutReader.css":"styles/aboutReader.css?5e5ae4","styles/angular-csp.css":"styles/angular-csp.css?e61a94","styles/angular-toastr.css":"styles/angular-toastr.css?b84bea","styles/annotator.css":"styles/annotator.css?0177be","styles/bootstrap.css":"styles/bootstrap.css?65fac1","styles/clipper.css":"styles/clipper.css?9a8591","styles/icomoon.css":"styles/icomoon.css?a94f04","styles/katex.min.css":"styles/katex.min.css?43cde2","styles/pdfjs-overrides.css":"styles/pdfjs-overrides.css?28636f","styles/pretty-checkbox.css":"styles/pretty-checkbox.css?510e75","styles/rzslider.css":"styles/rzslider.css?1ab012","styles/select.css":"styles/select.css?44b81e","styles/sidebar.css":"styles/sidebar.css?70de78"},
  sidebarAppUrl: settings.sidebarAppUrl || 'https://hypothes.is/app.html',
  clipperAppUrl: settings.clipperAppUrl
});

},{"../shared/settings":3,"./boot":1}],3:[function(_dereq_,module,exports){
'use strict';

// `Object.assign()`-like helper. Used because this script needs to work
// in IE 10/11 without polyfills.

function assign(dest, src) {
  for (var k in src) {
    if (src.hasOwnProperty(k)) {
      dest[k] = src[k];
    }
  }
  return dest;
}

/**
 * Return a parsed `js-hypothesis-config` object from the document, or `{}`.
 *
 * Find all `<script class="js-hypothesis-config">` tags in the given document,
 * parse them as JSON, and return the parsed object.
 *
 * If there are no `js-hypothesis-config` tags in the document then return
 * `{}`.
 *
 * If there are multiple `js-hypothesis-config` tags in the document then merge
 * them into a single returned object (when multiple scripts contain the same
 * setting names, scripts further down in the document override those further
 * up).
 *
 * @param {Document|Element} document - The root element to search.
 */
function jsonConfigsFrom(document) {
  var config = {};
  var settingsElements = document.querySelectorAll('script.js-hypothesis-config');

  for (var i = 0; i < settingsElements.length; i++) {
    var settings;
    try {
      settings = JSON.parse(settingsElements[i].textContent);
      if (!settings.startTime) {
        settings.startTime = new Date().getTime();
      }
    } catch (err) {
      console.warn('Could not parse settings from js-hypothesis-config tags', err);
      settings = {};
    }
    assign(config, settings);
  }

  return config;
}

module.exports = {
  jsonConfigsFrom: jsonConfigsFrom
};

},{}]},{},[2])
null
