import React, { ReactNode, useEffect, useState } from 'react';
import { Button } from '~/src/uikit';

import styles from './styles.module.scss';

type SliderProps = {
    children: ReactNode[];
};

const Slider = ({ children }: SliderProps) => {
    const [currSlideNum, setCurrSlideNum] = useState(0);
    const [slides, setSlides] = useState<ReactNode[]>([]);
    const itemsCount = children.length as number;
    const slidesToShow = 3;
    const maxSlides = Math.ceil(itemsCount / slidesToShow);

    useEffect(() => {
        setSlides(children);
    }, []);

    const handlePrev = () => {
        if (currSlideNum) setCurrSlideNum(currSlideNum - 1);
    };
    const handleNext = () => {
        if (currSlideNum < maxSlides - 1) setCurrSlideNum(currSlideNum + 1);
    };

    return (
        <div className={styles.slider}>
            <div className={styles.childContainer}>
                <div
                    className={styles.slide}
                    style={{
                        transform: `translateX(calc(${
                            currSlideNum ? -100 * currSlideNum : 0
                        }% + ${20 * currSlideNum + 10}px))`,
                    }}
                >
                    {slides}
                </div>
            </div>
            <Button onClick={handlePrev} className={styles.prev}>
                {'<'}
            </Button>
            <Button onClick={handleNext} className={styles.next}>
                {'>'}
            </Button>
        </div>
    );
};

export default Slider;
