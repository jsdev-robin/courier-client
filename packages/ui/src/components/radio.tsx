import * as React from 'react';

import { cn } from '../lib/utils';

function Radio({
  className,
  checked,
  ...props
}: React.ComponentProps<'input'> & { checked?: boolean }) {
  return (
    <input
      type="radio"
      data-slot="radio"
      checked={checked}
      className={cn(
        'border border-input disabled:opacity-50 disabled:pointer-events-none bg-background focus:ring-offset-background focus:ring-primary checked:bg-primary checked:border-primary',
        className,
      )}
      {...props}
    />
  );
}

export { Radio };
