export type TopicType = {
  id: number;
  question: string;
  answer: string;
  test_id: number;
};

export interface CreateTopicInterface {
  question: string;
  answer: string;
  test_id: number;
}
