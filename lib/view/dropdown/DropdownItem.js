const
    React           = require('react'),
    stopPropagation = event => event.stopPropagation(),

    DropdownItem = ({ selected, type, value, description }) => {

        const
            extraClass = selected ? 'is-selected' : '',
            itemClassName       = `Dropdown-listItem${extraClass}`,
            descriptorClassName = `Descriptor Descriptor--${type}`;

        return (
            <li className={ itemClassName }>
                <label className="Dropdown-label">
                    <input type="radio" className="u-hidden" name="move" value={ value } onClick={ stopPropagation } />
                    <span className={ descriptorClassName }>{ description }</span>
                </label>
            </li>
        );
    };

module.exports = DropdownItem;