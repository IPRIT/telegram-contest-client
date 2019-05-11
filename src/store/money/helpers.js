import { getElementOffset } from '../../utils/browser';
import { animationDelay } from '../../utils/animation';
import { generateNumber } from '../../utils/misc';

export function createAnimation (userId, funds = 10) {
  const root = document.querySelector( '#app' );

  const rowElement = document.querySelector( `[data-user-id="${userId}"]` );
  const rowOffset = getElementOffset( rowElement );
  const userNameElement = rowElement.querySelector( '.js-money-row__name' );
  const userNameClassName = userNameElement.className;
  const tcClass = userNameClassName.match( /(tc\d+)/i )[1];

  const duration = 500 + Math.random() * 1000;

  const bubbleWrapper = document.createElement( 'div' );
  bubbleWrapper.classList.add( 'js-money-row__bubble-wrapper' );

  const bubble = document.createElement( 'div' );
  bubbleWrapper.appendChild( bubble );

  bubbleWrapper.style.transform = `translate3d(${rowOffset.left}px, ${rowOffset.top}px, 0px)`;

  const animatingClass = `js-money-row__bubble_animating${generateNumber(1, 2)}`;

  bubble.className = `js-money-row__bubble ${tcClass}`;
  bubble.innerHTML = `+$${funds}`;
  bubble.classList.add( animatingClass );

  root.appendChild( bubbleWrapper );

  return animationDelay( 10 ).then(_ => {
    bubble.style.animationDuration = `${duration}ms`;
    return animationDelay( duration - 300 );
  }).then(_ => {
    root.removeChild( bubbleWrapper );
  });
}
