import classnames from 'classnames';
import './Number.css';

function Number(params) {
  const { number, flipped, hidden } = params;
  const disabledClass = hidden ? 'hidden' : 'shaded';
  const className = classnames('Number', flipped === 0 ? disabledClass : 'prime');

  if (flipped === -1 || (hidden && (flipped === 0))) {
    return null;
  }

  return <div className={className}>{number}</div>;
}

export default Number;
