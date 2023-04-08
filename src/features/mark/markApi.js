import { apiSlice } from "../api/apiSlice";

export const markApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentResult: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: users } = await fetchWithBQ("/users?role_ne=admin");
        const { data: submittedAssignments } = await fetchWithBQ(
          "/assignmentMark"
        );
        const { data: submittedQuiz } = await fetchWithBQ("/quizMark");

        const data = users.map((user) => {
          const studentAssignments = submittedAssignments.filter(
            (assignment) => assignment.student_id === user.id
          );
          const assignmentMark = studentAssignments.reduce(
            (totalMark, assignment) => totalMark + assignment.mark,
            0
          );

          const studentQuizzes = submittedQuiz.filter(
            (quiz) => quiz.student_id === user.id
          );

          const quizMark = studentQuizzes.reduce(
            (totalMark, quiz) => totalMark + quiz.mark,
            0
          );

          return {
            ...user,
            quizMark: quizMark,
            assignmentMark: assignmentMark,
          };
        });

        const leaderboard = data.map((el) => {
          return {
            ...el,
            totalMark: el.quizMark + el.assignmentMark,
          };
        });

        const sortResults = leaderboard.sort(
          (a, b) => b.totalMark - a.totalMark
        );

        const leaderboardRank = sortResults.map((student, index) => ({
          ...student,
          rank: index + 1,
        }));

        if (leaderboardRank?.length > 0) {
          let currentPostion = 1;
          let prevMark = leaderboardRank[0].totalMark;
          leaderboardRank.map((student, index) => {
            if (student.totalMark < prevMark) {
              currentPostion = index + 1;
              prevMark = student.totalMark;
            }
            student.rank = currentPostion;
            return student;
          });
        }

        const finalResult = leaderboardRank.filter((lead) => lead.rank <= 20);

        return { data: finalResult };
      },
      providesTags: ["getStudentResult"],
    }),
  }),
});

export const { useGetStudentResultQuery } = markApi;
