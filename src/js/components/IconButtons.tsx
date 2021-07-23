import React, { FunctionComponent } from 'react';
import { style, classes } from 'typestyle';
import { useMediaQuery } from 'hooks/UseMediaQuery';
import injectStyle from 'hoc/injectStyle';
import styles from 'styles/buttons';
import { Stack } from 'components/Layout';
import { SVGComponent } from 'utils/types/SVG';

// Some react button props are causing a type error when passed to
// ButtonPrimary. By only picking needed props we can avoid this issue.
type ButtonProps = Pick<React.HTMLProps<HTMLButtonElement>, 'onClick' | 'disabled' | 'className'>;

interface Props extends ButtonProps {
  icon: SVGComponent;
  iconOnly?: 'always' | 'never' | 'mobile' | 'phone';
  children?: React.ReactNode;
}

const iconStyle = style({ flexShrink: 0 });
const buttonStype = style({ minWidth: 'auto' });

const iconOnlyButtonStyle = style({
  maxWidth: 56,
  minWidth: 56,
  padding: 0
});

const IconButton: FunctionComponent<Props> = ({ icon: Icon, iconOnly = 'never', className, children, ...props }) => {
  const media = useMediaQuery();

  const isAlwaysIconOnly = iconOnly === 'always';
  const isMobileIconOnly = media !== 'Desktop' && iconOnly === 'mobile';
  const isPhoneIconOnly = media === 'Phone' && iconOnly === 'phone';
  const isIconOnly = isAlwaysIconOnly || isMobileIconOnly || isPhoneIconOnly;

  return (
    <button {...props} className={classes(className, buttonStype, isIconOnly && iconOnlyButtonStyle)}>
      <Stack spacing={11} flexDirection="row" alignItems="center">
        <Icon className={iconStyle} />
        {!isIconOnly && <span>{children}</span>}
      </Stack>
    </button>
  );
};

export const IconButtonPrimary = injectStyle(IconButton, styles.buttonPrimary);

export const IconButtonSecondary = injectStyle(IconButton, styles.buttonSecondary);
