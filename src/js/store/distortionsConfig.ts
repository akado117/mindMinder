export type Distortions = [
  'filtering',
  'blackAndWhite',
  'overgeneralization',
  'fortuneTelling',
  'catastrophy',
  'personalization',
  'control',
  'fairness',
  'blaming',
  'shoulds',
  'emotionalReasoning',
  'falacyOfChange',
  'globalLabeling',
  'alwaysRight',
  'heavensReward'
]

interface DistortionMap {
  [distortion: Distortions]: string;
}

export const distortionImages: DistortionMap = {
  filtering: 'filtering.png',
  blackAndWhite: 'black-and-white.png',
  overgeneralization: 'overgeneralization.png',
  fortuneTelling: 'fortune.png',
  catastrophy: 'cata.png',
  control: 'control.png',
  personalization: 'personal.png',
  fairness: 'fair.png',
  blaming: 'blaming.png',
  shoulds: 'shoulds.png',
  emotionalReasoning: 'emotional.png',
  falacyOfChange: 'change.png',
  globalLabeling: 'labeling.png',
  alwaysRight: 'always-right.png',
  heavensReward: 'heavens-reward.png'
}

export const distortionTitles: DistortionMap = {
  filtering: 'Filtering, Negative Filter, or Disqualifying the Positive',
  blackAndWhite: 'Black-or-White Thinking or All-or-Nothing Thinking',
  overgeneralization: 'Overgeneralization',
  fortuneTelling: 'Jumping to Conclusions, Mind Reading, or Fortune Telling',
  catastrophy: 'Catastrophizing, Magnification, and Minimization',
  personalization: 'Personalization',
  control: 'Control Fallacies',
  fairness: 'Fallacy of Fairness',
  blaming: 'Blaming',
  shoulds: 'Shoulds',
  emotionalReasoning: 'Emotional Reasoning',
  falacyOfChange: 'Fallacy of Change',
  globalLabeling: 'Global Labeling or Mislabeling',
  alwaysRight: 'Always Being Right',
  heavensReward: 'Heaven’s Reward Fallacy'
}

export const distortionDescriptors: DistortionMap = {
  filtering: 'A person engaging in filter (or “mental filtering) takes the negative details and magnifies those details while filtering out all positive aspects of a situation. For instance, a person may pick out a single, unpleasant detail and dwell on it exclusively so that their vision of reality becomes darkened or distorted. When a cognitive filter is applied, the person sees only the negative and ignores anything positive.',
  blackAndWhite: 'In polarized thinking, things are either “black-or-white” or “all-or-nothing.” We have to be perfect or we’re a complete and abject failure — there is no middle ground. A person with polarized thinking places people or situations in “either/or” categories, with no shades of gray or allowing for the complexity of most people and most situations. A person with black-and-white thinking sees things only in extremes.',
  overgeneralization: 'In this cognitive distortion, a person comes to a general conclusion based on a single incident or a single piece of evidence. If something bad happens just once, they expect it to happen over and over again. A person may see a single, unpleasant event as part of a never-ending pattern of defeat.',
  fortuneTelling: 'Without individuals saying so, a person who jumps to conclusions knows what another person is feeling and thinking — and exactly why they act the way they do. In particular, a person is able to determine how others are feeling toward the person, as though they could read their mind. Jumping to conclusions can also manifest itself as fortune-telling, where a person believes their entire future is pre-ordained (whether it be in school, work, or romantic relationships).',
  catastrophy: 'When a person engages in catastrophizing, they expect disaster to strike, no matter what. This is also referred to as magnifying, and can also come out in its opposite behavior, minimizing. In this distortion, a person hears about a problem and uses what if questions (e.g., “What if tragedy strikes?” “What if it happens to me?”) to imagine the absolute worst occurring.',
  personalization: 'Personalization is a distortion where a person believes that everything others do or say is some kind of direct, personal reaction to them. They literally take virtually everything personally, even when something is not meant in that way. A person who experiences this kind of thinking will also compare themselves to others, trying to determine who is smarter, better looking, etc.',
  control: `This distortion involves two different but related beliefs about being in complete control of every situation in a person’s life. In the first, if we feel externally controlled, we see ourselves as helpless a victim of fate. For example, “I can’t help it if the quality of the work is poor, my boss demanded I work overtime on it.” 
  The fallacy of internal control has us assuming responsibility for the pain and happiness of everyone around us. For example, “Why aren’t you happy? Is it because of something I did?”`,
  fairness: 'In the fallacy of fairness, a person feels resentful because they think that they know what is fair, but other people won’t agree with them. As our parents tell us when we’re growing up and something doesn’t go our way, “Life isn’t always fair.” People who go through life applying a measuring ruler against every situation judging its “fairness” will often feel resentful, angry, and even hopelessness because of it. Because life isn’t fair — things will not always work out in a person’s favor, even when they should.',
  blaming: `When a person engages in blaming, they hold other people responsible for their emotional pain. They may also take the opposite track and instead blame themselves for every problem — even those clearly outside their own control.
  For example, “Stop making me feel bad about myself!” Nobody can “make” us feel any particular way — only we have control over our own emotions and emotional reactions.`,
  shoulds: `Should statements (“I should pick up after myself more…”) appear as a list of ironclad rules about how every person should behave. People who break the rules make a person following these should statements angry. They also feel guilty when they violate their own rules. The emotional consequence is guilt.
  A person may often believe they are trying to motivate themselves with shoulds and shouldn’ts, as if they have to be punished before they can do anything. For example, “I really should exercise. I shouldn’t be so lazy.” Musts and oughts are also offenders. 
  When a person directs should statements toward others, they often feel anger, frustration and resentment.`,
  emotionalReasoning: `The distortion of emotional reasoning can be summed up by the statement, “If I feel that way, it must be true.” Whatever a person is feeling is believed to be true automatically and unconditionally. If a person feels stupid and boring, then they must be stupid and boring.
  Emotions are extremely strong in people, and can overrule our rational thoughts and reasoning. Emotional reasoning is when a person’s emotions takes over our thinking entirely, blotting out all rationality and logic (Emotions over Thoughts, E/T).`,
  falacyOfChange: `In the fallacy of change, a person expects that other people will change to suit them if they just pressure or cajole them enough. A person needs to change people because their hopes for success and happiness seem to depend entirely on them.
  This distortion is often found in thinking around relationships. For example, a girlfriend who tries to get her boyfriend to improve his appearance and manners, in the belief that this boyfriend is perfect in every other way and will make them happy if they only changed these few minor things.`,
  globalLabeling: `In global labeling/mislabeling, a person generalizes one or two qualities into a negative global judgment about themselves or another person. This is an extreme form of overgeneralizing. Instead of describing an error in context of a specific situation, a person will attach an unhealthy universal label to themselves or others.
  For example, they may say, “I’m a loser” in a situation where they failed at a specific task. When someone else’s behavior rubs a person the wrong way — without bothering to understand any context around why — they may attach an unhealthy label to him, such as “He’s a real jerk.”`,
  alwaysRight: `When a person engages in this distortion, they are continually putting other people on trial to prove that their own opinions and actions are the absolute correct ones. To a person engaging in “always being right,” being wrong is unthinkable — they will go to any length to demonstrate their rightness.
  For example, “I don’t care how badly arguing with me makes you feel, I’m going to win this argument no matter what because I’m right.” Being right often is more important than the feelings of others around a person who engages in this cognitive distortion, even loved ones.`,
  heavensReward: 'This is the false belief that a person’s sacrifice and self-denial will eventually pay off, as if some global force is keeping score. This is a riff on the fallacy of fairness, because in a fair world, the people who work the hardest will get the largest reward. A person who sacrifices and works hard but doesn’t experience the expected pay off will usually feel bitter when the reward doesn’t come.'
}