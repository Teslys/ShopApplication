import {HStack} from 'native-base';

import {useSelector, useDispatch} from 'react-redux';
import NavigatorItem from './components/NavigatorItem';
import NavigatorList from './NavigatorList';

function BottomNavigator(): JSX.Element {
  //   const [selected, setSelected] = useState(0);

  return (
    <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
      {NavigatorList.map((item, key) => {
        return (
          <NavigatorItem
            key={key}
            title={item.title}
            defaultIcon={item.defaultIcon}
            selectedIcon={item.selectedIcon}
            id={item.id}
            location={item.location}></NavigatorItem>
        );
      })}
    </HStack>
  );
}

export default BottomNavigator;
