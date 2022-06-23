// filenames from img/static dir
const avatars = ['blizzrep', 'sysop', 'moderator', 'speaker', 'deadhardcore', 'unknown', 'broodwar', 'starcraft', 'war2', 'diablo', 'referee'];

function getDefaultAvatar() : string {
    return avatars[0];
}

function getNextAvatar(curAvatar: string) : string {
    const curIndex = avatars.indexOf(curAvatar);

    if (curIndex === -1 || curIndex === avatars.length - 1) {
        return avatars[0];
    }

    return avatars[curIndex + 1];
}

function getPrevAvatar(curAvatar: string) : string {
    const curIndex = avatars.indexOf(curAvatar);

    if (curIndex === -1) {
        return avatars[0];
    }

    if (curIndex === 0)
    {
        return avatars[avatars.length - 1];
    }

    return avatars[curIndex - 1];
}

function getAvatarImagePath(avatarName: string) : string {
    if (!avatars.includes(avatarName)) {
        avatarName = getDefaultAvatar();
    }

    return `/static/img/${avatarName}.gif`;
}

export { getDefaultAvatar, getNextAvatar, getPrevAvatar, getAvatarImagePath };
