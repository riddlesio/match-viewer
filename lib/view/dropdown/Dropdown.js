const
    React           = require('react'),
    createView      = require('omniscient'),
    DropdownItem    = require('./DropdownItem'),
    PlaybackEvent   = require('../../event/PlaybackEvent'),

    definition = {

        getInitialState: () => ({
            isExpanded: false
        }),

        collapse: function () {

            if (!this.isExpanded()) {
                return;
            }

            this.setState({ isExpanded: false });
            setTimeout(() => PlaybackEvent.trigger(PlaybackEvent.PLAY), 350);
        },

        expand: function () {

            if (this.isExpanded()) {
                return;
            }

            this.setState({ isExpanded: true });
            PlaybackEvent.trigger(PlaybackEvent.PAUSE);
        },


        handleChange: function (event) {

            var selectedState;

            if (this.isExpanded()) {
                return;
            }

            event.stopPropagation();

            selectedState = parseInt(event.target.value, 10);

            PlaybackEvent.trigger(PlaybackEvent.GOTO, { state: selectedState });
        },

        isExpanded: function () {

            return this.state.isExpanded;
        },

        toggle: function (event) {

            const
                isExpanded = this.isExpanded();

            event.stopPropagation();

            if (isExpanded) {

                this.collapse();
                return;
            }

            this.expand();
        }
    },

    render = function ({ descriptors, selectedIndex }) {

        var extraClass = this.isExpanded() ? 'is-expanded' : 'is-collapsed',
            className  = ['Dropdown GamePlayer-dropdown', extraClass].join(' ');

        return (
            <ul className={ className }
                onClick={ this.toggle }
                onChange={ this.handleChange }>
                    { descriptors.map(renderDropdownItem(selectedIndex)) }
            </ul>
        );
    },

    renderDropdownItem = selectedIndex => ({ type, value }, index) => {

        const
            isSelected = selectedIndex === index,
            props = {
                key: index,
                description: value,
                selected: isSelected,
                value: index,
                type,
            };

        return <DropdownItem { ...props } />
    };

module.exports = createView('Dropdown', definition, render);
