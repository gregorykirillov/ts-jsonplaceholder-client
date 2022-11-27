import React, { FormEvent } from 'react';

import { Button, Input } from '~/src/uikit';

import styles from './styles.module.scss';

type EditAlbumComponentProps = {
    title: string;
    onSubmitForm: (event: FormEvent) => void;
    onChangeForm: (event: FormEvent) => void;
};

const EditAlbumComponent = ({
    title,
    onSubmitForm,
    onChangeForm,
}: EditAlbumComponentProps) => {
    return (
        <form className={styles.form} onSubmit={(event) => onSubmitForm(event)}>
            <div>
                <label htmlFor="title">Title</label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    className={styles.input}
                    onChange={(event) => onChangeForm(event)}
                />
            </div>
            <Button>Сохранить</Button>
        </form>
    );
};

export default EditAlbumComponent;
