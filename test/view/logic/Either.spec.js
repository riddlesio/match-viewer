import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Either from '../../../lib/view/logic/Either';

function Foo({ name }) {
    return <div>Foo</div>
}

function Bar({ name }) {
    return <div>Bar</div>
}


describe('<Either/>', () => {

    it('Should render Left when condition is false', () => {

        const wrapper = shallow(<Either Left={ Foo } Right={ Bar } condition={ false }/>);

        expect(wrapper.find(Foo)).to.have.length(1);
        expect(wrapper.find(Bar)).to.have.length(0);
    });

    it('Should render Right when condition is true', () => {

        const wrapper = shallow(<Either Left={ Foo } Right={ Bar } condition={ true }/>);

        expect(wrapper.find(Foo)).to.have.length(0);
        expect(wrapper.find(Bar)).to.have.length(1);
    });

    it('Should render Left when condition is a function which returns false', () => {

        const wrapper = shallow(<Either Left={ Foo } Right={ Bar } condition={ () => false }/>);

        expect(wrapper.find(Foo)).to.have.length(1);
        expect(wrapper.find(Bar)).to.have.length(0);
    });

    it('Should render Right when condition is a function which returns true', () => {

        const wrapper = shallow(<Either Left={ Foo } Right={ Bar } condition={ () => true }/>);

        expect(wrapper.find(Foo)).to.have.length(0);
        expect(wrapper.find(Bar)).to.have.length(1);
    });
});