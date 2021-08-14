# until-disconnected

```ts
import { UntilDisconnect, untilDisconnected } from '@quinntyne/until-disconnect';

@UntilDisconnect()
export class AppComponent extends HTMLElement {
  connectedCallback() {
    interval(1000)
      .pipe(untilDisconnected(this))
      .subscribe();
  }
}
```