import { Medal, Trophy, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BaseHome } from '@/components/app/BaseHome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncFetchLeaderBoard } from '@/states/leaderBoard/action';
import { requestState } from '@/utils/requestState';
import { LoadingThreadList } from '@/components/app/LoadingThread';

const Leaderboard = () => {
    const loadingState = useSelector((state) => state.leaderBoard.requestState);
    const leaderBoards = useSelector((state) => state.leaderBoard.leaderBoards);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncFetchLeaderBoard());
    }, [dispatch]);

    const getRankIcon = (index) => {
        switch (index) {
            case 0:
                return <Trophy className="w-6 h-6 text-yellow-500" />;
            case 1:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 2:
                return <Medal className="w-6 h-6 text-amber-700" />;
            default:
                return <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{index + 1}</div>;
        }
    };

    return (
        <BaseHome>
            {loadingState == requestState.loading ? (<LoadingThreadList />) : (
                <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold  flex items-center gap-2">
                            <Crown className="w-8 h-8 text-yellow-500" />
                            Leaderboard
                        </h1>
                    </div>

                    <Card className="shadow-xl">
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-200">
                                {leaderBoards.map((entry, index) => (
                                    <div
                                        key={entry.user.id}
                                        className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        <div className="flex-shrink-0">
                                            {getRankIcon(index)}
                                        </div>

                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                                {entry.user.name.charAt(0)}
                                            </div>
                                        </div>

                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-lg font-semibold truncate">
                                                        {entry.user.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-500 truncate">{entry.user.email}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                                        {entry.score} points
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

        </BaseHome>
    );
};

export default Leaderboard;