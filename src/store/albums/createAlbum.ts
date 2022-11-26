import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { createAlbumURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { AlbumType } from '~/src/types/AlbumType';
import { CreateAlbumData } from '~/src/components/CreateAlbumComponent';

export const createAlbum = createAsyncThunk(
    'album/createAlbum',
    async (data: CreateAlbumData) => {
        const response = await axios.post(createAlbumURL, {
            ...data,
        });
        return response.data;
    },
);

export const addCaseCreateAlbum = (
    builder: BuilderType,
    albumEntityAdapter: EntityAdapter<AlbumType>,
): BuilderType => {
    return builder
        .addCase(createAlbum.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(createAlbum.fulfilled, (state, { payload }) => {
            albumEntityAdapter.addOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(createAlbum.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
