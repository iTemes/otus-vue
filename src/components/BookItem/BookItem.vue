<script setup>
const props = defineProps({
  book: {
    type: Object,
    default: () => {},
  },
  inLibary: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onBookOpen", "onAddBook", "onRemoveBook"]);
</script>

<template>
  <article class="card">
    <img
      v-if="book.imageLinks"
      class="card__image"
      :src="book.imageLinks.thumbnail"
      :alt="book.title"
    />
    <div v-else class="card__no-image"><p>No image</p></div>
    <div class="card__details">
      <h4 class="card__name">{{ book.title }}</h4>
      <p class="card__subtitle">{{ book.subtitle }}</p>
      <p class="card__description">{{ book.description }}</p>

      <div class="card__meta">
        <button
          v-if="!inLibary"
          class="like shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
          @click="$emit('onAddBook')"
        >
          Add
        </button>
        <button
          v-else
          class="like shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
          @click="$emit('onRemoveBook')"
        >
          Remove
        </button>
        <button @click="$emit('onBookOpen')">Read more</button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  background: #fff;
  height: 470px;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;
  overflow: hidden;

  &:hover {
    .card__image {
      transform: scale(1.5);
      opacity: 0.6;
    }

    .card__details {
      top: 30%;
    }

    .card__description {
      opacity: 1;
    }
  }

  &__image,
  &__no-image {
    height: 85%;
    object-fit: cover;
    width: 100%;
    max-width: 100%;
    transform: scale(1);
    transform-origin: 0 0;
    margin-bottom: 0;
    transition: all 0.2s ease;
    background: #d6d6d6;
  }

  &__no-image {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 2em;

    color: #fff;
  }

  &__details {
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 75%;
    padding: 20px;
    transition: all 0.2s ease;
  }

  &__name {
    margin: 0;
    font-weight: 600;
  }

  &__subname {
    color: #e74c3c;
  }

  &__description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    line-height: 1.3em;

    color: #666;
    opacity: 0;
    transition: all 0.4s ease;
  }

  &__meta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    color: #999;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.like {
  cursor: pointer;

  button {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
  }
  svg {
    width: 20px;
    height: 20px;

    path[id="bg"] {
      fill: rgba(0, 0, 0, 0);
    }
  }

  &:hover {
    svg {
      opacity: 0.4;

      path[id="bg"] {
        fill: #ff1d25;
      }
    }
  }

  &.active {
    svg {
      width: 20px;
      height: 20px;

      path[id="bg"] {
        fill: #ff1d25;
      }
    }

    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
}
</style>
