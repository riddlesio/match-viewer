(function (window, undefined) {

    const
        DOM         = require('../util/DOM'),
        createClass = require('../util/createClass');

    var MoveBox
        _defaults = {
            initialState: {
                isExpanded: false,
                moves: []
            }
        };

    /**
     * MoveBox defines collapsing and expanding behavior the select box
     * @param options
     */
    MoveBox = createClass({

        construct: function (options) {

            this.settings = _.extend({}, options, _defaults);
            this.setState(this.settings.initialState);

            //set defaults
            this.boxHeight = 600;
            this.view = $(selector);
            this.data = [];
            this.colors = colors;
            this.view.css({height: (this.boxHeight - 60) + 'px'});
            this.selectedOption = 0;
        },

        /**
         * MoveBox.clear removes all options from the MoveBox
         */
        clear: function () {
            this.view.empty();
        },

        /**
         * MoveBox.collapse collapses the select box
         */
        collapse: function () {

            var domNode = AbstractGame.getDOMNode();

            var newHeight = (this.boxHeight - 60) + 'px',
                moveBox = this;

            if (this.settings.isExpanded) {

            }


            _.merge(this.settings, { isExpanded: false });

            // only collapse if expanded
            if (this.view.css('opacity') >= 1) {
                $('#textBox').removeClass('active');
                this.view.animate({ opacity: 0, height: '540px' }, 300, function () {
                    $(this).css({'display': 'none'});
                });
            }
        },

        /**
         * MoveBox.expand expands the select box
         */
        expand: function () {

            var newHeight = this.boxHeight + 'px',
                moveBox = this;

            // only expand if collapsed
            if (this.view.css('opacity') <= 0) {
                $('#textBox').addClass('active');
                this.view.css('display', 'block');
                this.view.animate({ opacity: 1, height: newHeight }, 300);
                this.view.scrollTop(19.17 * this.selectedOption);
            }
        },

        /**
         * MoveBox.toggle toggles between expanded/collapsed states
         */
        toggle: function () {

            var self = this;

            self.settings.isExpanded ? self.collapse() : self.expand();
        },

        /**
         * MoveBox.fill populates the MoveBox with options
         */
        fill: function(visibleHistory, players) {
            var attackingArmies = 0,
                currentMove,
                moveData,
                moveOption,
                moveType = null,
                optionText,
                regionName,
                sourceRegion,
                bold;

            this.view.empty();

            for (var i = 1; i < visibleHistory.moves.length; i++) {

                moveData = visibleHistory.moves[i].split(' ');

                if (i >= visibleHistory.moves.length - 1) { //game end
                    optionText = 'Game end';
                    bold = true;

                } else if (moveData.length <= 1) { //new round
                    if (moveData[0] == 0) {
                        optionText = 'Picking phase';
                    } else {
                        optionText = 'Round ' + moveData[0];
                    }
                    bold = true;

                } else {
                    currentMove = new Move(moveData, players);
                    moveType = currentMove.moveType;
                    regionName = 'Region ' + currentMove.sourceRegion;
                    bold = false;

                    if (currentMove.moveType === MoveType.ATTACK) {
                        regionName = 'Region ' + currentMove.targetRegion;

                        if (currentMove.isAttack(visibleHistory.map, i)) {
                            sourceRegion = visibleHistory.map[i - 1][currentMove.sourceRegion].split(';');
                            attackingArmies = currentMove.getAttackingArmies(sourceRegion[2]);

                        } else {
                            currentMove.moveType = MoveType.TRANSFER;
                        }
                    }

                    optionText = currentMove.toString(regionName, attackingArmies);
                }

                moveOption = document.createElement('option');
                moveOption.text = optionText;
                moveOption.value = i;
                if (bold) {
                    moveOption.setAttribute('class', 'option-bold');
                }

                if (moveType === MoveType.ILLEGAL) {
                    moveType = null;
                    moveOption.style.color = this.colors.illegal;
                }

                this.view.append(moveOption);
            }       
        },

        setMoves: function (moves) {

            this.setState({ moves: moves });

            var fragment,
                self = this;

            fragment = moves
                .map(createMoveOption)
                .join('');

            self.moves = moves;
            AbstractGame.getDOMNode().innerHTML = fragment;

            return self;
        },

        setState: function (diff) {

            this.settings = _.merge({}, this.settings, diff);
        },

        /**
         * MoveBox.setSelected selects the option at index
         * @param number index
         */
        setSelected: function (index) {
            
            if(index < 0 || index == null) {

                index = 0;

            } else if (index >= this.view[0].length) {
                
                index = this.view[0].length - 1;
            }

            // set the index
            this.view.val(index + 1);
            this.setMoveText(index);
        },

        /**
         *
         */
        setMoveText: function (index) {
            $('#moveText').val(this.view[0][index].text);
            this.selectedOption = index;
        }
    });

    function createMoveOption (move) {

        var { message, value, className } = move;

        return `<option className=".GamePlayer-moveOption ${className} value="${value}">${message}</option>`;
    }

    module.exports = MoveBox;

}(window));
