'use client';

import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/textfield/outlined-text-field.js';

export function MaterialWebDemo() {
  return (
    <div className="flex flex-col items-start gap-4 p-8">
      <md-outlined-text-field label="Your name" />
      <div className="flex gap-4">
        <md-outlined-button>
          <md-icon slot="icon">arrow_back</md-icon>
          Back
        </md-outlined-button>
        <md-filled-button>
          Next
          <md-icon slot="icon">arrow_forward</md-icon>
        </md-filled-button>
      </div>
    </div>
  );
}
