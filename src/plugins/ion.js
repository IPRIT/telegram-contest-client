import 'ion-sound';

export default function ({ app, store }, inject) {
  if (typeof window === 'undefined') {
    return;
  }

  ion.sound({
    sounds: [{
      name: "event"
    }],
    volume: 1,
    path: "/static/sounds/",
    preload: true,
    multiplay: true
  });

  inject( 'ion', ion );
}
