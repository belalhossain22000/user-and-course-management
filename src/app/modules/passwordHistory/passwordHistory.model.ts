

import mongoose from 'mongoose';
import { PasswordHistory } from './passwordHistory.interface';

const passwordHistorySchema = new mongoose.Schema<PasswordHistory>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const PasswordHistoryModel = mongoose.model('PasswordHistory', passwordHistorySchema);


