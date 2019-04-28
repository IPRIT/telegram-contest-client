import {
  getDocumentHeight, getElementHeight,
  getElementOffset,
  getElementRelativeOffset,
  getElementScrollHeight, getWindowHeight
} from "../../../../utils/browser";

import { resolveElement } from "../../../../utils/vue";
import { ensureNumber } from "../../../../utils/misc";
import * as easings from "../../../../utils/animation";

const defaults = {
  duration: 300,
  offset: 0,
  easing: 'easeInOutCubic'
};

/**
 * @param {FutureScrollToElement} target
 * @param {FutureScrollToOptions} settings
 * @param {FutureScrollToElement?} relativeElement
 * @return {number}
 */
function getTargetLocation (target, settings, relativeElement = null) {
  const isRelativeToWindow = !relativeElement;
  const getOffset = isRelativeToWindow
    ? getElementOffset
    : getElementRelativeOffset;

  let location = 0;

  if (typeof target === 'number') {
    location = target;
  } else {
    const element = resolveElement(target);
    const relative = resolveElement(relativeElement);
    if (element) {
      location = getOffset(
        ...[ element, relative ].filter(v => !!v)
      ).top;
    }
  }

  if (settings.offset) {
    location += ensureNumber(settings.offset);
  }

  const minLocation = isRelativeToWindow
    ? getDocumentHeight() - getWindowHeight()
    : getElementScrollHeight(relativeElement) - getElementHeight(relativeElement);

  return Math.round(
    Math.min(
      Math.max(location, 0),
      minLocation
    )
  );
}

/**
 * @param {FutureScrollToElement} target
 * @param {FutureScrollToOptions} options
 * @param {FutureScrollToElement} relativeTo
 */
export default function scrollTo (target, options, relativeTo = null) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return resolve();
    }

    const isRelativeToWindow = !relativeTo;
    const relativeElement = resolveElement(relativeTo);

    const settings = Object.assign({}, defaults, options);

    const startTime = performance.now();

    const startLocation = isRelativeToWindow ? window.pageYOffset : relativeElement.scrollTop;
    const targetLocation = getTargetLocation(target, settings, relativeElement);
    const distanceToScroll = targetLocation - startLocation;

    const easingFunction = typeof settings.easing === 'function'
      ? settings.easing
      : easings[ settings.easing ];

    if (isNaN(targetLocation)) {
      const type = target && target.constructor ? target.constructor.name : target;
      const err = new TypeError(`Target must be a Selector/Number/DOMElement/VueComponent, received ${type} instead.`);
      console.error(err);
      return reject(err);
    }

    if (!easingFunction) {
      const err = new RangeError(`Easing function '${settings.easing}' not found.`);
      console.error(err);
      return reject(err);
    }

    function step (currentTime) {
      const progressPercentage = Math.min(1, ((currentTime - startTime) / settings.duration));
      const targetPosition = Math.floor(startLocation + distanceToScroll * easingFunction(progressPercentage));

      if (isRelativeToWindow) {
        window.scrollTo(0, targetPosition);
        if (Math.round(window.pageYOffset) === targetLocation) {
          return resolve();
        }
      } else {
        relativeElement.scrollTop = targetPosition;
        if (Math.round(relativeElement.scrollTop) === targetLocation) {
          return resolve();
        }
      }

      if (currentTime - startTime < settings.duration) {
        window.requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    window.requestAnimationFrame(step);
  });
}
