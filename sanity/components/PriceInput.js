import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFromValue = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('lt-LT', {
  style: 'currency',
  currency: 'EUR',
}).format;

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    <h2>
      {type.title} - {value ? formatMoney(value / 100) : 'Not Set'}
    </h2>
    <p>{type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={(e) => onChange(createPatchFromValue(e.target.value))}
      ref={inputComponent}
    />
  </div>
);

PriceInput.focus = () => this._inputElement.focus();

export default PriceInput;
