const colourStyles = {
  menu: provided => ({ ...provided, zIndex: 9999 }),
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? null
      : isSelected
        ? ' #62B5E5'
        : isFocused
          ? 'rgba(179, 212, 252, 0.3)'
          : null,
    color: isDisabled
      ? '#ccc'
      : isSelected
        ? 'white'
        : isFocused
          ? '#62B5E5'
          : '#62B5E5',
  }),
  input: styles => ({ ...styles, color: '#62B5E5' }),
  placeholder: styles => ({ ...styles, color: '#62B5E5' }),
  singleValue: styles => ({ ...styles, color: '#62B5E5' }),
  menuList: styles => ({ ...styles, height: '170px' }),
};

export default colourStyles;
