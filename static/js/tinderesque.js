(function() {
  var animating = false;
  var all = 10;
  var results = [];
  var counter = document.querySelector('#counter');
  var recommendation = document.querySelector('#recommendation');
  var nameArray;
  var itemArray;
  var x = 1;
  var amount = 0;

  function updateCounter() {
    --all;
    counter.innerHTML = all;
  }

  function initNames(title, items) {
    nameArray = title;
    itemArray = items;
    createCards();
  }

  function createCards() {
    var cardlist = document.getElementById('cardlist');
    for (var i = 0; i < all; i++) {
      var li = document.createElement('li'),
        img = document.createElement('img'),
        a = document.createElement('a');
      a.href = itemArray[i];
      a.target = '_blank';
      li.classList.add('card');
      img.src = itemArray[i];
      a.appendChild(img);
      li.appendChild(a);
      if (i === 0) {
        li.classList.add('current');
      }
      cardlist.appendChild(li);
    }
  }

  function createRecommendations() {
    var row = document.getElementById('row'),
      hr = document.createElement('hr'),
      container = document.createElement('div');
    while (row.firstChild) {
      row.removeChild(row.firstChild);
    }
    row.appendChild(hr);
    for (var i = 0; i < amount; i++) {
      var col1 = document.createElement('div'),
        reco = document.createElement('div'),
        hr2 = document.createElement('hr'),
        h5 = document.createElement('p'),
        str = 'Based on: ' + nameArray[i].toString();
      h5.innerHTML = str;
      console.log();
      hr2.classList.add('mt-5');
      col1.classList.add('col-md-10', 'text-left', 'text-overflow', 'no-padding', 'scroll_' + i);
      col1.appendChild(h5);
      reco.classList.add(
        'col-md-10',
        'slider-border',
        'recommendations',
        'd-flex',
        'no-padding',
        'slick',
        'scroll_' + i
      );
      //sample recommednations
      for (var j = 0; j < 10; j++) {
        var singleReco = document.createElement('div'),
          img = document.createElement('img'),
          a = document.createElement('a');
        a.href = itemArray[j];
        img.src = itemArray[j];
        a.target = '_blank';
        a.appendChild(img);
        singleReco.appendChild(a);
        reco.appendChild(singleReco);
      }
      row.appendChild(col1);
      row.appendChild(reco);
      row.appendChild(hr2);
    }
    window.sr = ScrollReveal({ reset: true });
    sr.reveal('.scroll_0');
    sr.reveal('.scroll_1');
    sr.reveal('.scroll_2');
    sr.reveal('.scroll_3');
    sr.reveal('.scroll_4');
    sr.reveal('.scroll_5');
    sr.reveal('.scroll_6');
    sr.reveal('.scroll_7');
    sr.reveal('.scroll_8');
    sr.reveal('.scroll_9');
    sr.reveal('.scroll_10');
  }

  document.body.addEventListener('yepcard', function(ev) {
    var el = document.createElement('li');
    var domString = ev.detail.card.innerHTML;
    el.innerHTML = domString;

    results.push(el);
    amount++;
    updateCounter();
  });

  document.body.addEventListener('nopecard', function(ev) {
    updateCounter();
  });

  document.body.addEventListener('deckempty', function(ev) {
    console.log("Results:" + results);
    ev.detail.container.style.display = 'none';
    document.getElementById('title').innerHTML = '';

    document.getElementById('row1').classList.add('d-flex');

    console.log(results[0].img);
    createRecommendations();
    $(document).ready(function() {
      $('.slick').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });
    });
    var filtered = false;

    $(document).on('input', '#sweet', function() {
      var sweet = 1;
      if ($(this).val() != sweet) {
        $('.slick').slick('slickFilter', ':even');
      } else {
        $('.slick').slick('slickUnfilter');
      }
    });
  });

  function animatecard(ev) {
    if (animating === false) {
      var t = ev.target;
      if (t.className === 'but-nope') {
        t.parentNode.classList.add('nope');
        animating = true;
        fireCustomEvent('nopecard', {
          origin: t,
          container: t.parentNode,
          card: t.parentNode.querySelector('.card')
        });
      }
      if (t.className === 'but-yay') {
        t.parentNode.classList.add('yes');
        animating = true;
        fireCustomEvent('yepcard', {
          origin: t,
          container: t.parentNode,
          card: t.parentNode.querySelector('.card')
        });
      }
      if (t.classList.contains('current')) {
        fireCustomEvent('cardchosen', {
          container: getContainer(t),
          card: t
        });
      }
    }
  }

  function fireCustomEvent(name, payload) {
    var newevent = new CustomEvent(name, {
      detail: payload
    });
    document.body.dispatchEvent(newevent);
  }

  function getContainer(elm) {
    var origin = elm.parentNode;
    if (!origin.classList.contains('cardcontainer')) {
      origin = origin.parentNode;
    }
    return origin;
  }

  function animationdone(ev) {
    animating = false;
    var origin = getContainer(ev.target);
    if (ev.animationName === 'yay') {
      origin.classList.remove('yes');
    }
    if (ev.animationName === 'nope') {
      origin.classList.remove('nope');
    }
    if (origin.classList.contains('list')) {
      if (ev.animationName === 'nope' || ev.animationName === 'yay') {
        origin.querySelector('.current').remove();
        if (!origin.querySelector('.card')) {
          fireCustomEvent('deckempty', {
            origin: origin.querySelector('button'),
            container: origin,
            card: null
          });
        } else {
          origin.querySelector('.card').classList.add('current');
          document.getElementById('title').innerHTML = nameArray[x];
          x++;
        }
      }
    }
  }

  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.body.addEventListener('click', animatecard);
  window.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('tinderesque');
  });
  this.initNames = initNames;
})();
