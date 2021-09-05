const rolePermissions = {
    ADMIN: {
        canCreateTickets: true,
        canReadTickets: true,
        canUpdateTickets: true,
        canDeleteTickets: true,

        canCommentOnTickets: true,

        canCreateProjects: true,
        canReadProjects: true,
        canUpdateProjects: true,
        canDeleteProjects: true,

        canAssignRolesToUsers: true,
        canAssignUsersToTickets: true,
        canAssignUsersToProjects: true,

        canCreateCommunity: true,
        canReadCommunity: true,
        canEditCommunity: true,
        canDeleteCommunity: true,
    },
    PM: {
        canCreateTickets: true,
        canReadTickets: true,
        canUpdateTickets: true,
        canDeleteTickets: true,

        canCommentOnTickets: true,

        canCreateProjects: true,
        canReadProjects: true,
        canUpdateProjects: true,
        canDeleteProjects: true,

        canAssignRolesToUsers: false,
        canAssignUsersToTickets: true,
        canAssignUsersToProjects: true,

        canCreateCommunity: false,
        canReadCommunity: false,
        canEditCommunity: false,
        canDeleteCommunity: false,
    },
    REPORTER: {
        canCreateTickets: true,
        canReadTickets: true,
        canUpdateTickets: true,
        canDeleteTickets: true,

        canCommentOnTickets: true,

        canCreateProjects: false,
        canReadProjects: true,
        canUpdateProjects: false,
        canDeleteProjects: false,

        canAssignRolesToUsers: false,
        canAssignUsersToTickets: true,
        canAssignUsersToProjects: false,

        canCreateCommunity: false,
        canReadCommunity: false,
        canEditCommunity: false,
        canDeleteCommunity: false,
    },
    DEVELOPER: {
        canCreateTickets: false,
        canReadTickets: true,
        canUpdateTickets: true,
        canDeleteTickets: false,

        canCommentOnTickets: false,

        canCreateProjects: false,
        canReadProjects: true,
        canUpdateProjects: false,
        canDeleteProjects: false,

        canAssignRolesToUsers: false,
        canAssignUsersToTickets: false,
        canAssignUsersToProjects: false,

        canCreateCommunity: false,
        canReadCommunity: false,
        canEditCommunity: false,
        canDeleteCommunity: false,
    },
}
module.exports = rolePermissions