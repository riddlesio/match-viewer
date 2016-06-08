import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import createMaybe from '../../../lib/view/logic/createMaybe';
import Nothing from '../../../lib/view/logic/Nothing';

function Foo({ name }) {
    return <div>Foo</div>
}

describe('createMaybe', () => {

    it('Should return a function', () => {

        const Maybe = createMaybe({ Component: Foo, predicate: _ => false });

        expect(Maybe).to.be.a('function');
    });

    describe('<Maybe />', () => {

        it('Should render Nothing when predicate returns false', () => {

            const Maybe = createMaybe({ Component: Foo, predicate: _ => false });

            const wrapper = shallow(<Maybe />);

            expect(wrapper.find(Nothing)).to.have.length(1);
            expect(wrapper.find(Foo)).to.have.length(0);
        });

        it('Should render Nothing when predicate returns true', () => {

            const Maybe = createMaybe({ Component: Foo, predicate: _ => true });

            const wrapper = shallow(<Maybe />);

            expect(wrapper.find(Nothing)).to.have.length(0);
            expect(wrapper.find(Foo)).to.have.length(1);
        });

        it('Should pass its own props to predicate', () => {

            const Maybe = createMaybe({ Component: Foo, predicate: props => !props.hidden });

            const wrapper = shallow(<Maybe hidden={ false } />);

            expect(wrapper.find(Nothing)).to.have.length(0);
            expect(wrapper.find(Foo)).to.have.length(1);
        });
    });
});