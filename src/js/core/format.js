/* core/format.js — text helpers for search. Arabic is written many ways for the same word, so both the
   menu text and what the customer types are folded to one plain form before they are compared. */
(function (SU) {
  'use strict';

  /* أ إ آ ٱ → ا · ة → ه · ى → ي · ؤ → و · ئ → ي · no tashkeel (short vowels, shadda, sukun),
     no tatweel (ـ) · English lower-case · punctuation → space · spaces squeezed. */
  SU.fold = function (s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[ً-ٰٟـ]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();
  };

  /* A looser form for typos: long vowels (ا و ي) dropped, so «تشمني» still finds «تشيمني».
     Only used when the exact folded form finds nothing. */
  SU.foldLoose = function (s) {
    return SU.fold(s).replace(/[اوي]/g, '');
  };
})(window.SU = window.SU || {});
