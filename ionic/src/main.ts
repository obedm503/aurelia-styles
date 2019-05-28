import 'core-js/stable';
import { Aurelia, EventManager } from 'aurelia-framework';
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import './styles.scss';

export function configure(aurelia: Aurelia) {
  aurelia.use.standardConfiguration();

  const eventManager: EventManager = aurelia.container.get(EventManager);
  eventManager.registerElementConfig({
    tagName: 'ion-input',
    properties: {
      value: ['ionChange'], // find the real event from ion input and replace this
    },
  });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  //Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
