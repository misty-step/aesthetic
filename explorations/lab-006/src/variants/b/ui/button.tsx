// Lane B: the registry button reskinned to the aesthetic idiom — a
// contained ink shape (site `.ae-button`), quiet hairline variant, and
// the 13px compact register. Structure and Base UI behavior are stock;
// the cva strings are owned.
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 border font-medium whitespace-nowrap transition-opacity outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          'border-foreground bg-foreground text-background hover:opacity-90',
        quiet:
          'border-foreground bg-transparent text-foreground hover:bg-muted',
        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-muted',
      },
      size: {
        default: 'min-h-11 px-6 py-2',
        compact: 'min-h-8 px-4 py-1 text-xs',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
