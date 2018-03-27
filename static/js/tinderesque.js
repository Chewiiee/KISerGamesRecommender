(function(){
  var animating = false;
  var all = 0;
    var results = document.querySelector('#results');
    var counter = document.querySelector('#counter');

    function updatecounter() {
        --all;
        counter.innerHTML = all;
    }

    document.body.addEventListener('yepcard', function(ev) {
        results.innerHTML += '<li>' + ev.detail.card.innerHTML + '</li>';
        updatecounter();
    });

    document.body.addEventListener('nopecard', function(ev) {
        updatecounter();
    });

    document.body.addEventListener('deckempty', function(ev) {
        results.classList.add('live');
        ev.detail.container.style.display = 'none';
    });

    window.addEventListener('load', function(ev) {
        // check if template is supported
        // browsers without it wouldn't need to
        // do the content shifting
        if ('content' in document.createElement('template')) {
            // get the template
            var t = document.querySelector('template');
            // get its parent element
            var list = t.parentNode;
            // cache the template content
            var contents = t.innerHTML;
            // kill the template
            list.removeChild(t);
            // add the cached content to the parent
            list.innerHTML += contents;
        }
        var listitems = document.body.querySelectorAll('.card');
        all = listitems.length + 1;
        updatecounter();
    });


  function animatecard(ev) {
    if (animating === false) {
      var t = ev.target;
      if (t.className === 'but-nope') {
        t.parentNode.classList.add('nope');
        animating = true;
        fireCustomEvent('nopecard',
          {
            origin: t,
            container: t.parentNode,
            card: t.parentNode.querySelector('.card')
          }
        );
      }
      if (t.className === 'but-yay') {
        t.parentNode.classList.add('yes');
        animating = true;
        fireCustomEvent('yepcard',
          {
            origin: t,
            container: t.parentNode,
            card: t.parentNode.querySelector('.card')
          }
        );
      }
      if (t.classList.contains('current')) {
        fireCustomEvent('cardchosen',
          {
            container: getContainer(t),
            card: t
          }
        );
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
    if (!origin.classList.contains('cardcontainer')){
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
      if (ev.animationName === 'nope' ||
          ev.animationName === 'yay') {
        origin.querySelector('.current').remove();
        if (!origin.querySelector('.card')) {
          fireCustomEvent('deckempty', {
            origin: origin.querySelector('button'),
            container: origin,
            card: null
          });
        } else {
          origin.querySelector('.card').classList.add('current');
        }
      }
    }
  }

  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.body.addEventListener('click', animatecard);
  window.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('tinderesque');
  });
})();