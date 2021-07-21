import React, { FunctionComponent } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #D0D1D2',
    height: 68,
    width: '100%'
  },
  pageHeaderText: {
    color: '#32325D',
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: 17,
    lineHeight: '23px'
  }
}));

interface Props {
  title: string;
}

const PageHeader: FunctionComponent<Props> = ({ title }) => {
  const styles = useStyles(useTheme());

  return (
    <div className={styles.pageHeader}>
      <h3 className={styles.pageHeaderText}>{title}</h3>
    </div>
  );
};

export default PageHeader;
