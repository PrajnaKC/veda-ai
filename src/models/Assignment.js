"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const questionTypeSchema = new mongoose_1.Schema({
    type: { type: String, required: true, trim: true },
    count: { type: Number, required: true, min: 1 },
    marks: { type: Number, required: true, min: 1 }
}, { _id: false });
const uploadedFileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    extractedText: { type: String }
}, { _id: false });
const generatedPaperSchema = new mongoose_1.Schema({
    sections: [
        {
            title: { type: String, required: true },
            instruction: { type: String, required: true },
            questions: [
                {
                    text: { type: String, required: true },
                    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
                    marks: { type: Number, required: true }
                }
            ]
        }
    ]
}, { _id: false });
const assignmentSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    institutionName: { type: String, required: true, trim: true },
    collegeName: { type: String, trim: true },
    department: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    courseCode: { type: String, required: true, trim: true },
    examType: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    totalMarks: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
    instructions: { type: String },
    questionTypes: { type: [questionTypeSchema], default: [] },
    uploadedFile: uploadedFileSchema,
    status: {
        type: String,
        enum: ["queued", "processing", "completed", "failed"],
        default: "queued",
        index: true
    },
    generatedPaper: generatedPaperSchema,
    jobId: { type: String }
}, { timestamps: true });
exports.AssignmentModel = (_a = mongoose_1.default.models.Assignment) !== null && _a !== void 0 ? _a : mongoose_1.default.model("Assignment", assignmentSchema);
