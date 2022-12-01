import { useAppDispatch } from '~/src/store';
import { fetchAlbums } from '~/src/store/albums';

const fetchingItems: number[] = [];

type HandleScrollProps = {
    dispatch: typeof useAppDispatch | any;
};

let currPage = 2;
const incrementPage = () => (currPage += 1);

export const handleScroll = ({ dispatch }: HandleScrollProps) => {
    if (!fetchingItems.includes(currPage)) {
        fetchingItems.push(currPage);

        dispatch(fetchAlbums(currPage)).finally(() => {
            fetchingItems.splice(fetchingItems.indexOf(currPage), 1);
            incrementPage();
        });
    }
};
