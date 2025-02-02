/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/formular-validare/view.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);

async function fetchApiKey() {
  try {
    // Ensure wpApiSettings is available before making requests
    if (typeof window.wpApiSettings === "undefined") {
      throw new Error("wpApiSettings is not defined. Ensure it's properly localized.");
    }
    const response = await fetch(`${window.wpApiSettings.root}formular-blocks/v1/settings/`, {
      method: 'GET',
      headers: {
        'X-WP-Nonce': window.wpApiSettings.nonce,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch API key');
    const data = await response.json();
    return data['formular-api-key'];
  } catch (error) {
    console.error('Error fetching API key:', error);
    return null;
  }
}
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const form = document.querySelector('.form-cta-form');
  if (form) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const inputField = form.querySelector('.form-cta-input');
      const resultsDiv = document.querySelector('.cnp-result');
      const cnpValue = inputField.value.trim();
      if (!cnpValue) {
        alert('Te rog sa introduci un CNP');
        return;
      }
      const apiUrl = `https://api.openapi.ro/api/validate/cnp/${cnpValue}`;
      let apiKey = await fetchApiKey();
      if (!apiKey) {
        resultsDiv.innerHTML = `<p style="color: red;">Nu s-a putut obține cheia API.</p>`;
        return;
      }
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'x-api-key': apiKey
          }
        });
        if (!response.ok) {
          throw new Error('Eroare la validarea CNP-ului.');
        }
        const data = await response.json();
        // check if data is valid
        if (!data.valid) {
          resultsDiv.innerHTML = `<p style="color: red;">CNP-ul introdus nu este valid.</p>`;
          return;
        }
        console.log(data.parsed);
        const translatedData = `
                    <ul>
                        <li><strong>Indice Județ:</strong> ${data.parsed.county_index}</li>
                        <li><strong>Județul Nașterii:</strong> ${data.parsed.county_of_birth}</li>
                        <li><strong>Data Nașterii:</strong> ${data.parsed.date_of_birth}</li>
                        <li><strong>Rezident Străin:</strong> ${data.parsed.foreign_resident ? 'Da' : 'Nu'}</li>
                        <li><strong>Sex:</strong> ${data.parsed.sex === 'm' ? 'Masculin' : 'Feminin'}</li>
                    </ul>
                `;
        resultsDiv.innerHTML = translatedData;
      } catch (error) {
        console.error('Eroare API:', error);
        alert('A apărut o eroare la validarea CNP-ului. Verifică din nou.');
      }
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map