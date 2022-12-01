import { useAppDispatch } from '~/src/store';
import { fetchPosts } from '~/src/store/posts';

const fetchingItems: number[] = [];

type HandleScrollProps = {
    dispatch: typeof useAppDispatch | any;
};

let currPage = 2;
const incrementPage = () => (currPage += 1);

export const handleScroll = ({ dispatch }: HandleScrollProps) => {
    if (!fetchingItems.includes(currPage)) {
        fetchingItems.push(currPage);

        dispatch(fetchPosts(currPage)).finally(() => {
            fetchingItems.splice(fetchingItems.indexOf(currPage), 1);
            incrementPage();
        });
    }
};
