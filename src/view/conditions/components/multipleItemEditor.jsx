import React from 'react';
import Button from '@coralui/react-coral/lib/Button';

export default ({ fields, renderItem }) => {
  const rows = fields.map((field, index) => (
    <div data-type="row" key={ field }>
      { index !== 0 ? <div className="MultipleItemEditor-orLabel">or</div> : null }
      { renderItem(field) }
      {
        fields.length > 1 ?
          <Button
            className="u-gapLeft"
            icon="close"
            iconSize="XS"
            variant="minimal"
            square
            onClick={ fields.remove.bind(this, index) }
          /> : null
      }
    </div>
  ));

  return (
    <div>
      { rows }
      <div>
        <Button
          className="MultipleItemEditor-addPatternButton"
          onClick={ () => fields.push({}) }
        >
          Add Pattern
        </Button>
      </div>
    </div>
  );
};
