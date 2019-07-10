import DropdownFilter from '../client/src/components/DropdownFilter';

describe('Dropdown Component', () => {
  it('renders correctly', () => {
    const component = shallow(<DropdownFilter />);
    expect(component.exists('.form')).toBe(true);
  });
});