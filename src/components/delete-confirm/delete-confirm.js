import { forwardRef } from 'react';

import warrior from './warrior.svg';
import classes from './delete-confirm.module.scss';

const DeleteConfirm = forwardRef(({ showModal, setShowModal, onDelete }, ref) => (
  <div ref={ref} className={showModal ? classes.visible : classes.hidden}>
    <img src={warrior} className={classes.icon} alt="warrior" />
    <span className={classes.text}>Are you sure to delete this article?</span>

    <div className={classes.buttons}>
      <button className={classes['no-btn']} type="button" onClick={() => setShowModal(false)}>
        No
      </button>
      <button className={classes['yes-btn']} type="button" onClick={onDelete}>
        Yes
      </button>
    </div>
  </div>
));

export default DeleteConfirm;
