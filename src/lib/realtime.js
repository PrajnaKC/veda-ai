"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRealtimeServer = setRealtimeServer;
exports.getRealtimeServer = getRealtimeServer;
exports.emitGenerationEvent = emitGenerationEvent;
function setRealtimeServer(server) {
    globalThis.vedaRealtimeServer = server;
}
function getRealtimeServer() {
    var _a;
    return (_a = globalThis.vedaRealtimeServer) !== null && _a !== void 0 ? _a : null;
}
async function emitGenerationEvent(assignmentId, event, payload) {
    const server = getRealtimeServer();
    if (!server)
        return;
    server.to(`assignment-${assignmentId}`).emit(event, payload);
}
