import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import createEither from '../../../lib/view/logic/createEither';

function Foo({ name }) {
    return <div>Foo</div>
}

function Bar({ name }) {
    return <div>Bar</div>
}


describe('createEither', () => {

    it('Should return a function', () => {

        const Either = createEither({ Left: Foo, Right: Bar, isRight: _ => false });

        expect(Either).to.be.a('function');
    });

    describe('<Either />', () => {

        it('Should render Left when isRight returns false', () => {

            const Either = createEither({ Left: Foo, Right: Bar, isRight: _ => false });

            const wrapper = shallow(<Either />);

            expect(wrapper.find(Foo)).to.have.length(1);
            expect(wrapper.find(Bar)).to.have.length(0);
        });

        it('Should render Right when isRight returns true', () => {

            const Either = createEither({ Left: Foo, Right: Bar, isRight: _ => true });
            const wrapper = shallow(<Either />);

            expect(wrapper.find(Foo)).to.have.length(0);
            expect(wrapper.find(Bar)).to.have.length(1);
        });

        it('Should should pass its own props to isRight', () => {

            const Either = createEither({ Left: Foo, Right: Bar, isRight: props => !props.renderFoo });

            const wrapper = shallow(<Either renderFoo={ true } />);

            expect(wrapper.find(Foo)).to.have.length(1);
            expect(wrapper.find(Bar)).to.have.length(0);
        });
    });
});