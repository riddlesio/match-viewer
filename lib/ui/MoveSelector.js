import _                   from 'lodash';
// import DOM                 from '../util/DOM';
import classSet            from 'classnames';
import createClass         from '../util/createClass';
import AbstractUIComponent from './AbstractUIComponent';

var MoveSelector,
    defaults = {
        isExpanded: false,
        moves: [],
        selectedMove: null,
        selector: '.GamePlayer-moveSelector'
    };

/**
 * MoveSelector defines collapsing and expanding behavior the select box
 * @param options
 */
MoveSelector = createClass(AbstractUIComponent, {

    construct: function (options) {

        // Create settings
        const state = _.extend({}, options, defaults);

        this.setState(state);

        //set defaults
        // this.boxHeight = 600;
        // this.colors = colors;
        // this.view.css({height: (this.boxHeight - 60) + 'px'});
        // this.selectedOption = 0;
    },

    /**
     * MoveSelector.collapse collapses the select box
     */
    collapse: function () {

        this.setState({ isExpanded: false });

        // var domNode = this.getDOMNode();

        // var newHeight = (this.boxHeight - 60) + 'px',
        //     MoveSelector = this;


        // _.merge(this.settings, { isExpanded: false });

        // // only collapse if expanded
        // if (this.view.css('opacity') >= 1) {
        //     $('#textBox').removeClass('active');
        //     this.view.animate({ opacity: 0, height: '540px' }, 300, function () {
        //         $(this).css({'display': 'none'});
        //     });
        // }
    },

    /**
     * MoveSelector.expand expands the select box
     */
    expand: function () {

        this.setState({ isExpanded: true });

        // var newHeight = this.boxHeight + 'px',
        //     MoveSelector = this;

        // // only expand if collapsed
        // if (this.view.css('opacity') <= 0) {
        //     $('#textBox').addClass('active');
        //     this.view.css('display', 'block');
        //     this.view.animate({ opacity: 1, height: newHeight }, 300);
        //     this.view.scrollTop(19.17 * this.selectedOption);
        // }
    },

    /**
     * MoveSelector.toggle toggles between expanded/collapsed states
     */
    toggle: function () {

        this.state.isExpanded ? this.collapse() : this.expand();
    },

    /**
     * MoveSelector.fill populates the MoveSelector with options
     */
    fill: function(visibleHistory, players) {
        // var attackingArmies = 0,
        //     currentMove,
        //     moveData,
        //     moveOption,
        //     moveType = null,
        //     optionText,
        //     regionName,
        //     sourceRegion,
        //     bold;

        // this.view.empty();

        // for (var i = 1; i < visibleHistory.moves.length; i++) {

        //     moveData = visibleHistory.moves[i].split(' ');

        //     if (i >= visibleHistory.moves.length - 1) { //game end
        //         optionText = 'Game end';
        //         bold = true;

        //     } else if (moveData.length <= 1) { //new round
        //         if (moveData[0] == 0) {
        //             optionText = 'Picking phase';
        //         } else {
        //             optionText = 'Round ' + moveData[0];
        //         }
        //         bold = true;

        //     } else {
        //         currentMove = new Move(moveData, players);
        //         moveType = currentMove.moveType;
        //         regionName = 'Region ' + currentMove.sourceRegion;
        //         bold = false;

        //         if (currentMove.moveType === MoveType.ATTACK) {
        //             regionName = 'Region ' + currentMove.targetRegion;

        //             if (currentMove.isAttack(visibleHistory.map, i)) {
        //                 sourceRegion = visibleHistory.map[i - 1][currentMove.sourceRegion].split(';');
        //                 attackingArmies = currentMove.getAttackingArmies(sourceRegion[2]);

        //             } else {
        //                 currentMove.moveType = MoveType.TRANSFER;
        //             }
        //         }

        //         optionText = currentMove.toString(regionName, attackingArmies);
        //     }

        //     moveOption = document.createElement('option');
        //     moveOption.text = optionText;
        //     moveOption.value = i;
        //     if (bold) {
        //         moveOption.setAttribute('class', 'option-bold');
        //     }

        //     if (moveType === MoveType.ILLEGAL) {
        //         moveType = null;
        //         moveOption.style.color = this.colors.illegal;
        //     }

        //     this.view.append(moveOption);
        // }
    },

    render: function (state) {

        const moves = state.moves;
        const className = classSet({
            MoveSelector:   true,
            'is-expanded':  state.isExpanded,
            'is-collapsed': !state.isExpanded,
        });

        const fragment = moves
            .map(move => _.extend({ selected: move.value === state.selectedMove }, move))
            .map(createMoveOption)
            .join('');

        const domNode = this.findDOMNode();
        domNode.className =  className;
        domNode.innerHTML = fragment;
    },

    /**
     * Sets the moves
     * @param {Array} moves
     * @return {MoveSelector}
     */
    setMoves: function (moves) {

        return this.setState({ moves: moves });
    },

    /**
     * MoveSelector.setSelected selects the option at index
     * @param {Number} selectedMove
     */
    setSelected: function (index) {

        const amountOfMoves = this.state.moves.length;

        if (index == null || index < 0) {

            index = 0;
        }
        else if (index >= amountOfMoves) {

            index = amountOfMoves - 1;
        }

        this.setState({ selectedMove: index });

        // set the index
        // this.view.val(index + 1);
        // this.setMoveText(index);
    }

    /**
     *
     */
    // setMoveText: function (index) {
    //     $('#moveText').val(this.view[0][index].text);
    //     this.selectedOption = index;
    // }
});

// Private functions

/**
 * Binds all event listeners
 * @param  {MoveSelector} context
 */
function bindListeners (context) {

}

/**
 * Creates a move object from a move
 * @param  {Object} move
 * @return {String}
 */
function createMoveOption (move) {

    const { message, value, className } = move;

    return `<option className=".GamePlayer-moveOption ${className} value="${value}">${message}</option>`;
}

/**
 * Unbinds all event listeners
 * @param  {MoveBox} context
 */
function unbindListeners (context) {

}

export default MoveSelector;
