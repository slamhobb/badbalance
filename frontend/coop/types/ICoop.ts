import ICoopUser from './ICoopUser';

interface ICoop {
    id: number,
    name: string,
    users: ICoopUser[]
}

export default ICoop;
