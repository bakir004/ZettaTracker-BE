const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
    canCreateTickets: Boolean,
    canReadTickets: Boolean,
    canUpdateTickets: Boolean,
    canDeleteTickets: Boolean,

    canCommentOnTickets: Boolean,

    canCreateProjects: Boolean,
    canReadProjects: Boolean,
    canUpdateProjects: Boolean,
    canDeleteProjects: Boolean,

    canAssignRolesToUsers: Boolean,
    canAssignUsersToTickets: Boolean,
    canAssignUsersToProjects: Boolean,

    canCreateCommunity: Boolean,
    canReadCommunity: Boolean,
    canEditCommunity: Boolean,
    canDeleteCommunity: Boolean,
})

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = { Permission };